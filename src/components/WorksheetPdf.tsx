import React from "react";
import {
  Document,
  Font,
  Page,
  Text,
  View,
  pdf,
  StyleSheet,
} from "@react-pdf/renderer";
import type { Adaptation } from "../lib/worksheet";

Font.register({
  family: "Inter",
  fonts: [
    { src: "/fonts/inter-regular.woff", fontWeight: 400 },
    { src: "/fonts/inter-semibold.woff", fontWeight: 600 },
  ],
});

const styles = StyleSheet.create({
  page: {
    paddingTop: 40,
    paddingRight: 40,
    paddingBottom: 56,
    paddingLeft: 40,
    fontFamily: "Inter",
    fontSize: 13,
    lineHeight: 1.5,
    color: "#111111",
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 600,
    lineHeight: 1.35,
    marginBottom: 14,
  },
  studentFields: {
    flexDirection: "row",
    gap: 22,
    marginBottom: 16,
  },
  studentField: {
    flexGrow: 1,
    flexBasis: 0,
    flexDirection: "row",
    alignItems: "flex-end",
  },
  studentFieldLabel: {
    fontSize: 12,
    marginRight: 6,
  },
  studentFieldLine: {
    borderBottomWidth: 1,
    borderBottomColor: "#111111",
    flexGrow: 1,
    height: 14,
  },
  section: {
    marginBottom: 14,
  },
  sectionHeading: {
    fontSize: 13,
    fontWeight: 600,
    marginBottom: 5,
  },
  paragraph: {
    fontSize: 13,
    lineHeight: 1.5,
  },
  questions: {
    marginTop: 4,
  },
  questionBlock: {
    marginBottom: 18,
  },
  questionRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    marginBottom: 9,
  },
  checkbox: {
    width: 12,
    height: 12,
    borderWidth: 1,
    borderColor: "#111111",
    marginTop: 3,
  },
  questionText: {
    flexGrow: 1,
    flexShrink: 1,
    fontSize: 13,
    lineHeight: 1.5,
  },
  answerLines: {
    marginLeft: 20,
  },
  answerLine: {
    borderBottomWidth: 1,
    borderBottomColor: "#555555",
    height: 18,
    marginBottom: 6,
  },
  footer: {
    position: "absolute",
    left: 40,
    right: 40,
    bottom: 28,
    borderTopWidth: 1,
    borderTopColor: "#DDDDDD",
    paddingTop: 7,
    fontSize: 10,
    color: "#444444",
    textAlign: "center",
  },
});

function splitParagraphs(text: string): string[] {
  return text
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

function AnswerLines() {
  return (
    <View style={styles.answerLines}>
      <View style={styles.answerLine} />
      <View style={styles.answerLine} />
      <View style={styles.answerLine} />
    </View>
  );
}

type WorksheetDocumentProps = {
  draft: Adaptation;
};

export function WorksheetDocument({ draft }: WorksheetDocumentProps) {
  const instructions = splitParagraphs(draft.instructions);
  const passage = splitParagraphs(draft.passage);

  return (
    <Document title={draft.title} author="CHLD Adapt">
      <Page size="A4" style={styles.page} wrap>
        <View style={styles.header}>
          <Text style={styles.title}>{draft.title}</Text>
          <View style={styles.studentFields}>
            <View style={styles.studentField}>
              <Text style={styles.studentFieldLabel}>Name:</Text>
              <View style={styles.studentFieldLine} />
            </View>
            <View style={styles.studentField}>
              <Text style={styles.studentFieldLabel}>Date:</Text>
              <View style={styles.studentFieldLine} />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeading}>Instructions</Text>
          {instructions.map((paragraph, index) => (
            <Text key={`instruction-${index}`} style={styles.paragraph}>
              {paragraph}
            </Text>
          ))}
        </View>

        {passage.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.sectionHeading}>Reading</Text>
            {passage.map((paragraph, index) => (
              <Text key={`passage-${index}`} style={styles.paragraph}>
                {paragraph}
              </Text>
            ))}
          </View>
        ) : null}

        <View style={styles.questions}>
          {draft.questions.map((question) => (
            <View
              key={question.id}
              style={styles.questionBlock}
              wrap={
                question.text.length > 700 ||
                question.text.split("\n").length > 10
              }
            >
              <View style={styles.questionRow}>
                <View style={styles.checkbox} />
                <Text style={styles.questionText}>
                  {question.id.replace(/^Q/, "")}. {question.text}
                </Text>
              </View>
              <AnswerLines />
            </View>
          ))}
        </View>

        <Text
          style={styles.footer}
          fixed
          render={({ pageNumber, totalPages }) =>
            `Page ${pageNumber} of ${totalPages}`
          }
        />
      </Page>
    </Document>
  );
}

export async function createWorksheetPdf(draft: Adaptation): Promise<Blob> {
  return pdf(<WorksheetDocument draft={draft} />).toBlob();
}

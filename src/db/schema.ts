
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { CSSProperties } from "hono/jsx";

export type CertificateElements = {
    text: string;
    styles: CSSProperties
}[];

export const certificatesTable = sqliteTable("certificates_table", {
  id: text().primaryKey(),
  reciptent: text().notNull(),
  reciptentDescription: text().notNull().default(""),
  issuer: text(),
  issuerDescription: text().default(""),
  issuedAt: int().notNull(),
  issuedFor: text(),
  issuedForDescription: text(),
  certificateElements: text().notNull(),
  certificateBackground: text(),
  height: int().notNull().default(0),
  width: int().notNull().default(0),
  fonts: text().default("['Roboto Condensed']"),
});

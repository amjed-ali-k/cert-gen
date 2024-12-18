
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

type CertificateElements = {
    text: string;
    styles: Object
};

export const certificatesTable = sqliteTable("certificates_table", {
  id: text().primaryKey(),
  reciptent: text().notNull(),
  reciptentDescription: text().notNull().default(""),
  issuer: text().notNull(),
  issuerDescription: text().notNull().default(""),
  issuedAt: int().notNull().default(Date.now()),
  issuedFor: text(),
  issuedForDescription: text(),
  certificateElements: text().notNull().$type<CertificateElements>(),
  certificateBackground: text(),
  height: int().notNull().default(0),
  width: int().notNull().default(0),
  fonts: text().default("['Roboto Condensed']").$type<string[]>(),
});

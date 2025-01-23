PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_certificates_table` (
	`id` text PRIMARY KEY NOT NULL,
	`reciptent` text NOT NULL,
	`reciptentDescription` text DEFAULT '' NOT NULL,
	`issuer` text,
	`issuerDescription` text DEFAULT '',
	`issuedAt` integer NOT NULL,
	`issuedFor` text,
	`issuedForDescription` text,
	`certificateElements` text NOT NULL,
	`certificateBackground` text,
	`height` integer DEFAULT 0 NOT NULL,
	`width` integer DEFAULT 0 NOT NULL,
	`fonts` text DEFAULT '[''Roboto Condensed'']'
);
--> statement-breakpoint
INSERT INTO `__new_certificates_table`("id", "reciptent", "reciptentDescription", "issuer", "issuerDescription", "issuedAt", "issuedFor", "issuedForDescription", "certificateElements", "certificateBackground", "height", "width", "fonts") SELECT "id", "reciptent", "reciptentDescription", "issuer", "issuerDescription", "issuedAt", "issuedFor", "issuedForDescription", "certificateElements", "certificateBackground", "height", "width", "fonts" FROM `certificates_table`;--> statement-breakpoint
DROP TABLE `certificates_table`;--> statement-breakpoint
ALTER TABLE `__new_certificates_table` RENAME TO `certificates_table`;--> statement-breakpoint
PRAGMA foreign_keys=ON;
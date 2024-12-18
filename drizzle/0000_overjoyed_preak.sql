CREATE TABLE `certificates_table` (
	`id` text PRIMARY KEY NOT NULL,
	`reciptent` text NOT NULL,
	`reciptentDescription` text DEFAULT '' NOT NULL,
	`issuer` text NOT NULL,
	`issuerDescription` text DEFAULT '' NOT NULL,
	`issuedAt` integer DEFAULT 1734507204329 NOT NULL,
	`issuedFor` text,
	`issuedForDescription` text,
	`certificateElements` text NOT NULL,
	`certificateBackground` text,
	`height` integer DEFAULT 0 NOT NULL,
	`width` integer DEFAULT 0 NOT NULL,
	`fonts` text DEFAULT '[''Roboto Condensed'']'
);

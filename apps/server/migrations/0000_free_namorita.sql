DO $$ BEGIN
 CREATE TYPE "sale_point_format" AS ENUM('Мини_расш', 'Универсальный', 'Микро 2(3)', 'Филиал', 'Микро (РБ)', 'Стандарт', 'Прайм (РБ)', 'Стандарт+бизнес отдел', 'Брокер', 'Розничный (РБ)', 'Корпоративный', 'Привилегия (РБ)');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "atms" (
	"id" uuid PRIMARY KEY NOT NULL,
	"address" text NOT NULL,
	"all_day" boolean NOT NULL,
	"point" GEOMETRY(POINT) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "banks" (
	"id" uuid PRIMARY KEY NOT NULL,
	"sale_point_name" text NOT NULL,
	"sale_point_code" text NOT NULL,
	"address" text NOT NULL,
	"metro_station" text NOT NULL,
	"is_opened" boolean DEFAULT true NOT NULL,
	"rko" boolean DEFAULT false NOT NULL,
	"kep" boolean DEFAULT false NOT NULL,
	"has_ramp" boolean DEFAULT false NOT NULL,
	"my_branch" boolean DEFAULT false NOT NULL,
	"suo_availability" boolean DEFAULT false NOT NULL,
	"open_hours" jsonb NOT NULL,
	"open_hours_individual" jsonb NOT NULL,
	"office_type" text NOT NULL,
	"sale_point_format" "sale_point_format" NOT NULL,
	"point" GEOMETRY(POINT) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "circumstances" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"search_terms" text[] NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "services" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"search_terms" text[] NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tickets" (
	"id" uuid PRIMARY KEY NOT NULL,
	"window_id" uuid NOT NULL,
	"start_time" timestamp NOT NULL,
	"end_time" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "windows" (
	"id" uuid PRIMARY KEY NOT NULL,
	"service_id" uuid NOT NULL,
	"bank_id" uuid NOT NULL,
	"num" integer NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tickets" ADD CONSTRAINT "tickets_window_id_windows_id_fk" FOREIGN KEY ("window_id") REFERENCES "windows"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "windows" ADD CONSTRAINT "windows_service_id_services_id_fk" FOREIGN KEY ("service_id") REFERENCES "services"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "windows" ADD CONSTRAINT "windows_bank_id_banks_id_fk" FOREIGN KEY ("bank_id") REFERENCES "banks"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

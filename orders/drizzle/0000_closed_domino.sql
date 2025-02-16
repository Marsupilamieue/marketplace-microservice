CREATE TYPE "public"."order_status" AS ENUM('PENDING', 'PAID', 'CANCELLED', 'REFUNDED');--> statement-breakpoint
CREATE TYPE "public"."shipping_provider" AS ENUM('JNE', 'TIKI', 'SICEPAT', 'GOSEND', 'GRAB_EXPRESS');--> statement-breakpoint
CREATE TYPE "public"."shipping_status" AS ENUM('PENDING', 'SHIPPED', 'DELIVERED', 'RETURNED');--> statement-breakpoint
CREATE TABLE "cart" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenant_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"product_id" uuid NOT NULL,
	"quantity" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "order" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenant_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"order_date" timestamp with time zone DEFAULT now(),
	"total_amount" integer NOT NULL,
	"order_status" "order_status" DEFAULT 'PENDING' NOT NULL,
	"shipping_provider" "shipping_provider" NOT NULL,
	"shipping_code" text,
	"shipping_status" "shipping_status"
);
--> statement-breakpoint
CREATE TABLE "order_detail" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenant_id" uuid NOT NULL,
	"order_id" uuid NOT NULL,
	"product_id" uuid NOT NULL,
	"quantity" integer NOT NULL,
	"unit_price" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "payment" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenant_id" uuid NOT NULL,
	"order_id" uuid NOT NULL,
	"payment_date" timestamp with time zone DEFAULT now(),
	"payment_method" text NOT NULL,
	"payment_reference" text NOT NULL,
	"amount" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "order_detail" ADD CONSTRAINT "order_detail_order_id_order_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."order"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payment" ADD CONSTRAINT "payment_order_id_order_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."order"("id") ON DELETE no action ON UPDATE no action;
import {
  pgTable,
  text,
  timestamp,
  boolean,
  integer,
  serial,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified")
    .$defaultFn(() => false)
    .notNull(),
  image: text("image"),
  createdAt: timestamp("created_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  username: text("username").unique(),
  displayUsername: text("display_username"),
});

export const userRelations = relations(user, ({ many }) => ({
  prompts: many(prompt),
  starredPrompts: many(starredPrompts),
  remixedPrompts: many(remixedPrompts),
}));

export const prompt = pgTable("prompt", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  prompt: text("prompt").notNull(),
  model: text("model").notNull(),
  category: text("category").notNull(),
  stars: integer("stars")
    .$defaultFn(() => 0)
    .notNull(),
  remixes: integer("remixes")
    .$defaultFn(() => 0)
    .notNull(),
  views: integer("views")
    .$defaultFn(() => 0)
    .notNull(),
  isPublic: boolean("is_public")
    .$defaultFn(() => true)
    .notNull(),
  lastUpdated: timestamp("last_updated")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  createdOn: timestamp("created_on")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  tags: text("tags").array(),
  solves: text("solves"),
  models: text("models").array(),
  authorId: text("author_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const promptRelations = relations(prompt, ({ one, many }) => ({
  author: one(user, {
    fields: [prompt.authorId],
    references: [user.id],
  }),
  starredBy: many(starredPrompts),
  remixedBy: many(remixedPrompts),
}));

export const promptWithRemix = pgTable("prompt", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  prompt: text("prompt").notNull(),
  model: text("model").notNull(),
  category: text("category").notNull(),
  stars: integer("stars")
    .$defaultFn(() => 0)
    .notNull(),
  remixes: integer("remixes")
    .$defaultFn(() => 0)
    .notNull(),
  views: integer("views")
    .$defaultFn(() => 0)
    .notNull(),
  isPublic: boolean("is_public")
    .$defaultFn(() => true)
    .notNull(),
  lastUpdated: timestamp("last_updated")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  createdOn: timestamp("created_on")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  tags: text("tags").array(),
  solves: text("solves"),
  models: text("models").array(),
  authorId: text("author_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").$defaultFn(
    () => /* @__PURE__ */ new Date(),
  ),
  updatedAt: timestamp("updated_at").$defaultFn(
    () => /* @__PURE__ */ new Date(),
  ),
});

export const starredPrompts = pgTable("starred_prompts", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  promptId: text("prompt_id")
    .notNull()
    .references(() => prompt.id, { onDelete: "cascade" }),
});

export const starredPromptsRelations = relations(starredPrompts, ({ one }) => ({
  user: one(user, {
    fields: [starredPrompts.userId],
    references: [user.id],
  }),
  prompt: one(prompt, {
    fields: [starredPrompts.promptId],
    references: [prompt.id],
  }),
}));

export const remixedPrompts = pgTable("remixed_prompts", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  promptId: text("prompt_id")
    .notNull()
    .references(() => prompt.id, { onDelete: "cascade" }),
});

export const remixedPromptsRelations = relations(remixedPrompts, ({ one }) => ({
  user: one(user, {
    fields: [remixedPrompts.userId],
    references: [user.id],
  }),
  prompt: one(prompt, {
    fields: [remixedPrompts.promptId],
    references: [prompt.id],
  }),
}));

export const feedback = pgTable("feedback", {
  id: text("id").primaryKey(),
  type: text("type").notNull(),
  name: text("name"),
  url: text("url"),
  issue: text("issue"),
  reason: text("reason"),
  logs: text("logs"),
  message: text("message"),
  email: text("email"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const schema = {
  user,
  session,
  account,
  verification,
  prompt: promptWithRemix,
  starredPrompts,
  remixedPrompts,
  userRelations,
  promptRelations,
  starredPromptsRelations,
  remixedPromptsRelations,
};

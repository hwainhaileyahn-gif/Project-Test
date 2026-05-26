import {
  pgTable,
  uuid,
  text,
  date,
  boolean,
  integer,
  timestamp,
} from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

// ─── 경력 ────────────────────────────────────────────────────────────────────

export const experiences = pgTable('experiences', {
  id:         uuid('id').primaryKey().defaultRandom(),
  company:    text('company').notNull(),
  role:       text('role').notNull(),
  startedAt:  date('started_at').notNull(),          // 입사일 (필수)
  endedAt:    date('ended_at'),                       // 퇴사일 (NULL = 현재 재직 중)
  sortOrder:  integer('sort_order').default(0).notNull(),
  createdAt:  timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt:  timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
})

export const experienceDescriptions = pgTable('experience_descriptions', {
  id:           uuid('id').primaryKey().defaultRandom(),
  experienceId: uuid('experience_id')
    .notNull()
    .references(() => experiences.id, { onDelete: 'cascade' }),
  content:      text('content').notNull(),
  sortOrder:    integer('sort_order').default(0).notNull(),
})

// ─── 학력 ────────────────────────────────────────────────────────────────────

export const educations = pgTable('educations', {
  id:          uuid('id').primaryKey().defaultRandom(),
  school:      text('school').notNull(),
  degree:      text('degree').notNull(),              // 학사 / 석사 / 자격증 등
  major:       text('major').notNull(),
  startedAt:   date('started_at'),                    // 자격증은 NULL 허용
  endedAt:     date('ended_at'),                      // NULL = 재학 중
  description: text('description'),
  sortOrder:   integer('sort_order').default(0).notNull(),
  createdAt:   timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt:   timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
})

// ─── 스킬 ────────────────────────────────────────────────────────────────────

export const skills = pgTable('skills', {
  id:        uuid('id').primaryKey().defaultRandom(),
  name:      text('name').notNull(),
  category:  text('category').notNull(),              // finance | strategy | tool | legal | etc
  sortOrder: integer('sort_order').default(0).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
})

// ─── 프로젝트 ─────────────────────────────────────────────────────────────────

export const projects = pgTable('projects', {
  id:          uuid('id').primaryKey().defaultRandom(),
  title:       text('title').notNull(),
  description: text('description'),
  imageUrl:    text('image_url'),
  liveUrl:     text('live_url'),
  githubUrl:   text('github_url'),
  featured:    boolean('featured').default(false).notNull(),
  sortOrder:   integer('sort_order').default(0).notNull(),
  createdAt:   timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt:   timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
})

export const projectTags = pgTable('project_tags', {
  id:        uuid('id').primaryKey().defaultRandom(),
  projectId: uuid('project_id')
    .notNull()
    .references(() => projects.id, { onDelete: 'cascade' }),
  name:      text('name').notNull(),
  sortOrder: integer('sort_order').default(0).notNull(),
})

// ─── Relations ───────────────────────────────────────────────────────────────

export const experiencesRelations = relations(experiences, ({ many }) => ({
  descriptions: many(experienceDescriptions),
}))

export const experienceDescriptionsRelations = relations(experienceDescriptions, ({ one }) => ({
  experience: one(experiences, {
    fields: [experienceDescriptions.experienceId],
    references: [experiences.id],
  }),
}))

export const projectsRelations = relations(projects, ({ many }) => ({
  tags: many(projectTags),
}))

export const projectTagsRelations = relations(projectTags, ({ one }) => ({
  project: one(projects, {
    fields: [projectTags.projectId],
    references: [projects.id],
  }),
}))

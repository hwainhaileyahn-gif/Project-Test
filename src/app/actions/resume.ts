'use server'

import { db } from '@/lib/db'
import { experiences, experienceDescriptions, educations } from '@/../drizzle/schema'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

// ─── Experiences ──────────────────────────────────────────────────────────────

export async function createExperience(formData: FormData) {
  const company = formData.get('company') as string
  const role = formData.get('role') as string
  const startedAt = formData.get('startedAt') as string
  const endedAt = (formData.get('endedAt') as string) || null
  const sortOrder = Number(formData.get('sortOrder')) || 0
  const descs = ((formData.get('descriptions') as string) || '')
    .split('\n').map(s => s.trim()).filter(Boolean)

  const [exp] = await db.insert(experiences).values({
    company, role, startedAt, endedAt, sortOrder,
  }).returning()

  if (descs.length > 0) {
    await db.insert(experienceDescriptions).values(
      descs.map((content, i) => ({ experienceId: exp.id, content, sortOrder: i }))
    )
  }

  revalidatePath('/')
  redirect('/')
}

export async function updateExperience(id: string, formData: FormData) {
  const company = formData.get('company') as string
  const role = formData.get('role') as string
  const startedAt = formData.get('startedAt') as string
  const endedAt = (formData.get('endedAt') as string) || null
  const sortOrder = Number(formData.get('sortOrder')) || 0
  const descs = ((formData.get('descriptions') as string) || '')
    .split('\n').map(s => s.trim()).filter(Boolean)

  await db.update(experiences).set({
    company, role, startedAt, endedAt, sortOrder, updatedAt: new Date(),
  }).where(eq(experiences.id, id))

  await db.delete(experienceDescriptions).where(eq(experienceDescriptions.experienceId, id))

  if (descs.length > 0) {
    await db.insert(experienceDescriptions).values(
      descs.map((content, i) => ({ experienceId: id, content, sortOrder: i }))
    )
  }

  revalidatePath('/')
  redirect('/')
}

export async function deleteExperience(id: string) {
  await db.delete(experiences).where(eq(experiences.id, id))
  revalidatePath('/')
}

// ─── Educations ───────────────────────────────────────────────────────────────

export async function createEducation(formData: FormData) {
  const school = formData.get('school') as string
  const degree = formData.get('degree') as string
  const major = formData.get('major') as string
  const startedAt = (formData.get('startedAt') as string) || null
  const endedAt = (formData.get('endedAt') as string) || null
  const description = (formData.get('description') as string) || null
  const sortOrder = Number(formData.get('sortOrder')) || 0

  await db.insert(educations).values({
    school, degree, major, startedAt, endedAt, description, sortOrder,
  })

  revalidatePath('/')
  redirect('/')
}

export async function updateEducation(id: string, formData: FormData) {
  const school = formData.get('school') as string
  const degree = formData.get('degree') as string
  const major = formData.get('major') as string
  const startedAt = (formData.get('startedAt') as string) || null
  const endedAt = (formData.get('endedAt') as string) || null
  const description = (formData.get('description') as string) || null
  const sortOrder = Number(formData.get('sortOrder')) || 0

  await db.update(educations).set({
    school, degree, major, startedAt, endedAt, description, sortOrder, updatedAt: new Date(),
  }).where(eq(educations.id, id))

  revalidatePath('/')
  redirect('/')
}

export async function deleteEducation(id: string) {
  await db.delete(educations).where(eq(educations.id, id))
  revalidatePath('/')
}

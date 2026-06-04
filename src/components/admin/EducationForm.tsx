'use client'

import { useState } from 'react'

interface DefaultValues {
  school?: string
  degree?: string
  major?: string
  startedAt?: string | null
  endedAt?: string | null
  description?: string | null
  sortOrder?: number
}

interface Props {
  action: (formData: FormData) => Promise<void>
  defaultValues?: DefaultValues
}

export default function EducationForm({ action, defaultValues }: Props) {
  const [isCurrent, setIsCurrent] = useState(
    defaultValues ? !defaultValues.endedAt : false
  )

  return (
    <form action={action} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1.5">
            학교/기관명 <span className="text-red-400">*</span>
          </label>
          <input
            name="school"
            required
            defaultValue={defaultValues?.school}
            placeholder="예: 연세대학교"
            className="w-full border border-neutral-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1.5">
            구분 <span className="text-red-400">*</span>
          </label>
          <input
            name="degree"
            required
            defaultValue={defaultValues?.degree}
            placeholder="예: 학사 / 석사 / 자격증"
            className="w-full border border-neutral-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-1.5">
          전공/과목 <span className="text-red-400">*</span>
        </label>
        <input
          name="major"
          required
          defaultValue={defaultValues?.major}
          placeholder="예: 경영학과 / CFA (공인재무분석사) Level III 취득"
          className="w-full border border-neutral-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1.5">시작일</label>
          <input
            name="startedAt"
            type="date"
            defaultValue={defaultValues?.startedAt ?? ''}
            className="w-full border border-neutral-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors"
          />
          <p className="text-xs text-neutral-400 mt-1">자격증은 비워두셔도 됩니다</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1.5">종료일</label>
          <input
            name="endedAt"
            type="date"
            defaultValue={defaultValues?.endedAt ?? ''}
            disabled={isCurrent}
            className="w-full border border-neutral-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors disabled:bg-neutral-50 disabled:text-neutral-400 disabled:cursor-not-allowed"
          />
          <label className="flex items-center gap-2 mt-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={isCurrent}
              onChange={(e) => setIsCurrent(e.target.checked)}
              className="w-4 h-4 rounded accent-accent"
            />
            <span className="text-xs text-neutral-500">재학/수강 중</span>
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-1.5">설명</label>
        <textarea
          name="description"
          rows={3}
          defaultValue={defaultValues?.description ?? ''}
          placeholder="예: 재무·회계 심화 전공, 경영전략 우수논문상 수상"
          className="w-full border border-neutral-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors resize-y"
        />
      </div>

      <div className="w-36">
        <label className="block text-sm font-medium text-neutral-700 mb-1.5">정렬 순서</label>
        <input
          name="sortOrder"
          type="number"
          defaultValue={defaultValues?.sortOrder ?? 0}
          className="w-full border border-neutral-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors"
        />
      </div>

      <div className="flex gap-3 pt-2 border-t border-neutral-100">
        <button
          type="submit"
          className="px-6 py-2.5 bg-accent text-white rounded-xl text-sm font-medium hover:bg-accent-dark transition-colors cursor-pointer"
        >
          저장
        </button>
        <a
          href="/"
          className="px-6 py-2.5 border border-neutral-200 text-neutral-600 rounded-xl text-sm font-medium hover:bg-neutral-50 transition-colors"
        >
          취소
        </a>
      </div>
    </form>
  )
}

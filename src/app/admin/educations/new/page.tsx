import EducationForm from '@/components/admin/EducationForm'
import { createEducation } from '@/app/actions/resume'

export default function NewEducationPage() {
  return (
    <div className="min-h-screen bg-neutral-50 px-6 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <a
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-neutral-400 hover:text-neutral-600 transition-colors mb-6"
          >
            ← 포트폴리오로 돌아가기
          </a>
          <h1 className="text-2xl font-bold text-neutral-900">학력 추가</h1>
          <p className="text-sm text-neutral-500 mt-1">새 학력/자격증 사항을 입력하세요</p>
        </div>
        <div className="bg-white rounded-2xl border border-neutral-100 p-8 shadow-sm">
          <EducationForm action={createEducation} />
        </div>
      </div>
    </div>
  )
}

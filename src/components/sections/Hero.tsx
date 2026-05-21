export default function Hero() {
  return (
    <section
      id="about"
      className="min-h-screen flex items-center bg-white px-6"
    >
      <div className="max-w-5xl mx-auto w-full py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-up">
            <p className="text-sm font-medium text-accent tracking-widest uppercase mb-4">
              안녕하세요,
            </p>
            <h1
              className="font-bold text-neutral-900 leading-tight"
              style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", letterSpacing: "-0.02em" }}
            >
              Hailey입니다
            </h1>
            <h2 className="mt-4 text-xl text-neutral-600 font-normal">
              디자인과 개발을 함께하는 크리에이터
            </h2>
            <p className="mt-6 text-neutral-600 leading-relaxed max-w-md">
              사용자 경험을 중심으로 생각하고, 아이디어를 실제로 구현하는
              것을 좋아합니다. 아름다운 디자인과 깔끔한 코드로 의미 있는
              제품을 만들어갑니다.
            </p>
            <div className="mt-8 flex gap-4 flex-wrap">
              <a
                href="#projects"
                className="inline-flex items-center px-6 py-3 rounded-xl bg-accent text-white font-medium text-sm hover:bg-accent-dark transition-colors"
              >
                프로젝트 보기
              </a>
              <a
                href="#contact"
                className="inline-flex items-center px-6 py-3 rounded-xl border border-neutral-200 text-neutral-800 font-medium text-sm hover:border-accent hover:text-accent transition-colors"
              >
                연락하기
              </a>
            </div>
          </div>

          <div className="flex justify-center md:justify-end animate-fade-up">
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <div className="w-full h-full rounded-3xl bg-neutral-100 overflow-hidden ring-4 ring-accent/10">
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-neutral-400 text-sm">프로필 사진</span>
                </div>
              </div>
              <div className="absolute -bottom-3 -right-3 w-full h-full rounded-3xl border-2 border-accent/20 -z-10" />
            </div>
          </div>
        </div>

        <div className="mt-20 pt-12 border-t border-neutral-100">
          <p className="text-xs text-neutral-400 mb-5 tracking-widest uppercase">
            기술 스택
          </p>
          <div className="flex flex-wrap gap-6 text-sm text-neutral-500">
            {["React", "Next.js", "TypeScript", "Tailwind CSS", "Figma"].map(
              (tech) => (
                <span key={tech}>{tech}</span>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

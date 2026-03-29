// ─────────────────────────────────────
//  포트폴리오 데이터 — 여기를 수정하세요
// ─────────────────────────────────────
const PORTFOLIO_DATA = {
  profile: {
    name: "김재휘",
    title: "Brand Designer",
    bio: "브랜드가 보여지는 모든 접점을 디자인합니다. 패키징부터 디지털 커머스, 캠페인, 공간까지.",
    email: "kjhdesign1728@gmail.com",
    instagram: "",
    linkedin: ""
  },
  projects: [
    {
      id: "project-web",
      title: "Refilled — Website Design",
      subtitle: "탈모케어 뷰티 브랜드 자사몰 전체 웹사이트 디자인",
      categories: ["디지털"],
      date: "2024.03",
      thumbnail: "images/project-web/thumb.jpg",
      cover: "images/project-web/desktop_main.png",
      overview: "Refilled 공식 자사몰의 전체 UI/UX 디자인을 담당했습니다. 메인 페이지부터 브랜드 페이지, 프로모션 기획전, 제품 상세페이지까지 브랜드 아이덴티티를 기반으로 일관된 디지털 경험을 설계했습니다.",
      role: "UI/UX 디자인, 웹 디자인, 상세페이지 디자인",
      client: "Refilled",
      year: "2023 — 2024",
      sections: [
        { type: "full", image: "images/project-web/mockup_desktop_main.png", label: "Main Page" },
        { type: "full", image: "images/project-web/mockup_desktop_brand.png", label: "Brand Page" },
        { type: "full", image: "images/project-web/mockup_desktop_promotion.png", label: "Promotion" },
        { type: "full", image: "images/project-web/mockup_desktop_product.png", label: "Product Detail" },
        { type: "double", images: ["images/project-web/mockup_mobile_main.png", "images/project-web/mockup_mobile_product.png"], label: "Mobile Responsive" }
      ],
      images: [
        "images/project-web/mockup_desktop_main.png"
      ],
      visible: true
    },
    {
      id: "project-01",
      title: "프로젝트 제목 01",
      subtitle: "한 줄 프로젝트 설명을 여기에 씁니다",
      categories: ["광고"],
      date: "2025.03",
      thumbnail: "images/project-01/thumb.jpg",
      images: [
        "images/project-01/01.jpg",
        "images/project-01/02.jpg"
      ],
      overview: "프로젝트 배경과 목표를 여기에 씁니다.",
      role: "브랜드 디자인, 아트 디렉팅",
      visible: true
    },
    {
      id: "project-02",
      title: "프로젝트 제목 02",
      subtitle: "한 줄 프로젝트 설명을 여기에 씁니다",
      categories: ["브랜드"],
      date: "2025.01",
      thumbnail: "images/project-02/thumb.jpg",
      images: [
        "images/project-02/01.jpg"
      ],
      overview: "프로젝트 배경과 목표를 여기에 씁니다.",
      role: "패키지 디자인, 촬영 디렉팅",
      visible: true
    },
    {
      id: "project-03",
      title: "프로젝트 제목 03",
      subtitle: "한 줄 프로젝트 설명을 여기에 씁니다",
      categories: ["디지털"],
      date: "2024.11",
      thumbnail: "images/project-03/thumb.jpg",
      images: [
        "images/project-03/01.jpg"
      ],
      overview: "프로젝트 배경과 목표를 여기에 씁니다.",
      role: "웹 디자인, UI/UX",
      visible: true
    },
    {
      id: "project-04",
      title: "프로젝트 제목 04",
      subtitle: "한 줄 프로젝트 설명을 여기에 씁니다",
      categories: ["디지털"],
      date: "2024.08",
      thumbnail: "images/project-04/thumb.jpg",
      images: [
        "images/project-04/01.jpg"
      ],
      overview: "프로젝트 배경과 목표를 여기에 씁니다.",
      role: "프로모션 디자인",
      visible: true
    },
    {
      id: "project-05",
      title: "프로젝트 제목 05",
      subtitle: "한 줄 프로젝트 설명을 여기에 씁니다",
      categories: ["브랜드"],
      date: "2024.05",
      thumbnail: "images/project-05/thumb.jpg",
      images: [
        "images/project-05/01.jpg"
      ],
      overview: "프로젝트 배경과 목표를 여기에 씁니다.",
      role: "공간 디자인, 그래픽",
      visible: true
    }
  ]
};

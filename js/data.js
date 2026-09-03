const DEFAULT_JOBS = [
  {
    id: 1,
    title: "Unity Gameplay Developer",
    company: "SunByte Studio",
    logo: "SB",
    location: "Hà Nội",
    salary: "16 - 26 triệu",
    type: "Full-time",
    experience: "1 - 2 năm",
    category: "Game / IT",
    skills: ["Unity", "C#", "Gameplay"],
    hot: true,
    applicants: 14,
    posted: "1 giờ trước",
    description: "Phát triển gameplay, combat feel và tối ưu các hệ thống tương tác trong game Unity.",
    requirements: ["Có kinh nghiệm Unity và C#", "Biết OOP, Git, debugging", "Yêu thích xây dựng cảm giác gameplay"],
    benefits: ["Review lương định kỳ", "Thưởng sản phẩm", "Studio trẻ và cởi mở"],
    companyDesc: "Studio game indie tập trung vào các sản phẩm sáng tạo và đậm tính trải nghiệm."
  },
  {
    id: 2,
    title: "UI / UX Designer",
    company: "Solar Frame",
    logo: "SF",
    location: "Hồ Chí Minh",
    salary: "15 - 22 triệu",
    type: "Hybrid",
    experience: "1 năm",
    category: "Design",
    skills: ["Figma", "Prototype", "Design System"],
    hot: true,
    applicants: 18,
    posted: "3 giờ trước",
    description: "Thiết kế trải nghiệm web/app với hướng tiếp cận rõ ràng, ấm áp và truyền cảm hứng.",
    requirements: ["Sử dụng tốt Figma", "Có portfolio UI/UX", "Biết wireframe và prototype"],
    benefits: ["Hybrid working", "Budget học tập", "Review cùng team product"],
    companyDesc: "Product design team chuyên thiết kế các nền tảng số cho startup."
  },
  {
    id: 3,
    title: "Frontend Developer",
    company: "BrightPath Labs",
    logo: "BP",
    location: "Đà Nẵng",
    salary: "18 - 30 triệu",
    type: "Remote",
    experience: "2 năm",
    category: "Software",
    skills: ["JavaScript", "React", "CSS"],
    hot: false,
    applicants: 20,
    posted: "Hôm nay",
    description: "Xây dựng giao diện frontend hiện đại, tối ưu hiệu năng và trải nghiệm người dùng.",
    requirements: ["Nắm chắc HTML/CSS/JS", "Có kinh nghiệm React", "Hiểu responsive và accessibility"],
    benefits: ["Remote linh hoạt", "Máy làm việc", "Nghỉ phép mở rộng"],
    companyDesc: "Đơn vị phát triển phần mềm cho giáo dục và thương mại số."
  },
  {
    id: 4,
    title: "Content Marketing Executive",
    company: "Sunlane Commerce",
    logo: "SC",
    location: "Hà Nội",
    salary: "11 - 17 triệu",
    type: "Full-time",
    experience: "1 năm",
    category: "Marketing",
    skills: ["Content", "SEO", "Analytics"],
    hot: false,
    applicants: 9,
    posted: "1 ngày trước",
    description: "Lên ý tưởng nội dung, triển khai chiến dịch và theo dõi hiệu quả tăng trưởng.",
    requirements: ["Có tư duy nội dung", "Biết đọc số liệu", "Viết rõ ràng, đúng insight"],
    benefits: ["Thưởng KPI", "Đào tạo nội bộ", "Môi trường năng động"],
    companyDesc: "Doanh nghiệp thương mại điện tử chú trọng tăng trưởng bền vững."
  },
  {
    id: 5,
    title: "QA / Tester",
    company: "GlowOrbit Studio",
    logo: "GO",
    location: "Hồ Chí Minh",
    salary: "10 - 16 triệu",
    type: "Full-time",
    experience: "Fresher",
    category: "QA",
    skills: ["Testing", "Bug Report", "Jira"],
    hot: false,
    applicants: 13,
    posted: "2 ngày trước",
    description: "Kiểm thử sản phẩm, theo dõi bug và phối hợp cùng dev để đảm bảo chất lượng bản build.",
    requirements: ["Cẩn thận và logic", "Biết mô tả bug rõ ràng", "Ham học hỏi"],
    benefits: ["Đào tạo quy trình QA", "Mentor 1-1", "Có lộ trình tăng trưởng"],
    companyDesc: "Đội ngũ sản phẩm trẻ chuyên phát triển sản phẩm game và app giải trí."
  },
  {
    id: 6,
    title: "Junior Product Designer",
    company: "Daybreak Digital",
    logo: "DD",
    location: "Hà Nội",
    salary: "13 - 19 triệu",
    type: "Part-time",
    experience: "Fresher - 1 năm",
    category: "Design",
    skills: ["Figma", "Research", "UI"],
    hot: false,
    applicants: 11,
    posted: "3 ngày trước",
    description: "Hỗ trợ research, ideation và triển khai giao diện cho các tính năng mới.",
    requirements: ["Có portfolio cơ bản", "Tư duy thẩm mỹ tốt", "Chăm chỉ tiếp thu feedback"],
    benefits: ["Mentorship", "Lộ trình chính thức", "Linh hoạt thời gian"],
    companyDesc: "Agency sáng tạo tập trung vào trải nghiệm số và thiết kế sản phẩm."
  }
];

const DEFAULT_CANDIDATES = [
  {
    id: 101,
    name: "Nguyễn Minh Anh",
    title: "Unity Gameplay Developer",
    avatar: "MA",
    email: "minhanh.sun@gmail.com",
    phone: "0988 123 456",
    location: "Hà Nội",
    experience: "2 năm",
    skills: ["Unity", "C#", "2D Game", "Git"],
    education: "FPT Polytechnic — Lập trình Game",
    about: "Developer tập trung vào gameplay feel, enemy AI và tối ưu trải nghiệm người chơi.",
    appliedJobId: 1,
    appliedAt: "31/08/2026",
    status: "pending",
    score: 94
  },
  {
    id: 102,
    name: "Trần Gia Huy",
    title: "UI / UX Designer",
    avatar: "GH",
    email: "giahuy.ui@gmail.com",
    phone: "0977 222 188",
    location: "Hồ Chí Minh",
    experience: "1.5 năm",
    skills: ["Figma", "Wireframe", "Prototype"],
    education: "Đại học Kiến Trúc TP.HCM",
    about: "UI/UX Designer yêu thích những trải nghiệm gọn gàng, nhiều cảm xúc và dễ dùng.",
    appliedJobId: 2,
    appliedAt: "30/08/2026",
    status: "accepted",
    score: 91
  },
  {
    id: 103,
    name: "Lê Thu Trang",
    title: "Frontend Developer",
    avatar: "TT",
    email: "thutrang.front@gmail.com",
    phone: "0966 551 991",
    location: "Đà Nẵng",
    experience: "2 năm",
    skills: ["React", "TypeScript", "CSS", "Accessibility"],
    education: "Đại học Bách Khoa Đà Nẵng",
    about: "Frontend Developer chú trọng UI quality, component consistency và hiệu năng.",
    appliedJobId: 3,
    appliedAt: "29/08/2026",
    status: "pending",
    score: 88
  },
  {
    id: 104,
    name: "Phạm Đức Long",
    title: "Content Marketing Executive",
    avatar: "DL",
    email: "duclong.content@gmail.com",
    phone: "0911 901 202",
    location: "Hà Nội",
    experience: "3 năm",
    skills: ["Content", "SEO", "Analytics"],
    education: "Học viện Báo chí và Tuyên truyền",
    about: "Content marketer có kinh nghiệm xây chiến dịch và tối ưu tăng trưởng theo dữ liệu.",
    appliedJobId: 4,
    appliedAt: "27/08/2026",
    status: "rejected",
    score: 81
  }
];

const DEFAULT_MESSAGES = [
  {
    id: 1,
    person: "SunByte Studio",
    avatar: "SB",
    role: "Nhà tuyển dụng",
    last: "Bạn rảnh phỏng vấn online vào chiều thứ 4 không?",
    time: "21:14",
    unread: 1,
    messages: [
      {from: "them", text: "Chào bạn, team đã xem portfolio của bạn.", time: "20:42"},
      {from: "me", text: "Dạ em cảm ơn anh/chị ạ.", time: "20:45"},
      {from: "them", text: "Bạn rảnh phỏng vấn online vào chiều thứ 4 không?", time: "21:14"}
    ]
  },
  {
    id: 2,
    person: "Solar Frame",
    avatar: "SF",
    role: "Nhà tuyển dụng",
    last: "Portfolio của bạn rất phù hợp định hướng của team.",
    time: "Hôm qua",
    unread: 0,
    messages: [
      {from: "them", text: "Portfolio của bạn rất phù hợp định hướng của team.", time: "16:22"}
    ]
  }
];

const DEFAULT_APPLICATIONS = [
  {id: 301, jobId: 1, candidateName: "Nguyễn Văn A", date: "31/08/2026", status: "pending"},
  {id: 302, jobId: 2, candidateName: "Nguyễn Văn A", date: "28/08/2026", status: "accepted"},
  {id: 303, jobId: 4, candidateName: "Nguyễn Văn A", date: "25/08/2026", status: "rejected"}
];

function seedData() {
  if (!localStorage.getItem("sunwork_jobs")) localStorage.setItem("sunwork_jobs", JSON.stringify(DEFAULT_JOBS));
  if (!localStorage.getItem("sunwork_candidates")) localStorage.setItem("sunwork_candidates", JSON.stringify(DEFAULT_CANDIDATES));
  if (!localStorage.getItem("sunwork_messages")) localStorage.setItem("sunwork_messages", JSON.stringify(DEFAULT_MESSAGES));
  if (!localStorage.getItem("sunwork_applications")) localStorage.setItem("sunwork_applications", JSON.stringify(DEFAULT_APPLICATIONS));
  if (!localStorage.getItem("sunwork_saved_jobs")) localStorage.setItem("sunwork_saved_jobs", JSON.stringify([1, 3, 6]));
  if (!localStorage.getItem("sunwork_talent_board")) localStorage.setItem("sunwork_talent_board", JSON.stringify([101, 102]));
}
seedData();

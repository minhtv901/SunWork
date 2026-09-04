const DEFAULT_JOBS = [
  {
    id: 1,
    employerId: 9001,
    title: "Digital Marketing Executive",
    company: "Bright Media Vietnam",
    logo: "BM",
    location: "Hà Nội",
    salary: "12 - 20 triệu",
    type: "Full-time",
    experience: "1 - 2 năm",
    category: "Marketing",
    skills: ["Facebook Ads", "Google Ads", "SEO"],
    hot: true,
    applicants: 2,
    posted: "2 giờ trước",
    description: "Triển khai chiến dịch Digital Marketing, tối ưu quảng cáo và theo dõi hiệu quả theo từng kênh.",
    requirements: ["Có kinh nghiệm chạy quảng cáo", "Biết đọc số liệu marketing", "Chủ động và có tư duy sáng tạo"],
    benefits: ["Thưởng KPI", "Đào tạo chuyên môn", "Review lương định kỳ"],
    companyDesc: "Agency chuyên Digital Marketing, Content, SEO và xây dựng thương hiệu cho doanh nghiệp."
  },
  {
    id: 2,
    employerId: 9001,
    title: "Content Marketing Specialist",
    company: "Bright Media Vietnam",
    logo: "BM",
    location: "Hà Nội",
    salary: "11 - 18 triệu",
    type: "Hybrid",
    experience: "1 năm",
    category: "Content Marketing",
    skills: ["Content Writing", "Social Media", "Copywriting"],
    hot: true,
    applicants: 1,
    posted: "5 giờ trước",
    description: "Lên kế hoạch nội dung và triển khai bài viết cho Facebook, TikTok, website và các chiến dịch thương hiệu.",
    requirements: ["Khả năng viết tốt", "Hiểu social media", "Có tư duy storytelling"],
    benefits: ["Hybrid working", "Thưởng nội dung", "Budget học tập"],
    companyDesc: "Agency chuyên Digital Marketing, Content, SEO và xây dựng thương hiệu cho doanh nghiệp."
  },
  {
    id: 3,
    employerId: 9102,
    title: "Performance Marketing Specialist",
    company: "GrowthPilot Agency",
    logo: "GP",
    location: "Hồ Chí Minh",
    salary: "18 - 30 triệu",
    type: "Full-time",
    experience: "2 năm",
    category: "Performance Marketing",
    skills: ["Meta Ads", "Google Ads", "GA4"],
    hot: true,
    applicants: 24,
    posted: "Hôm nay",
    description: "Quản lý ngân sách quảng cáo, tối ưu CPA/ROAS và xây dựng báo cáo tăng trưởng theo dữ liệu.",
    requirements: ["Có kinh nghiệm performance", "Hiểu funnel", "Sử dụng tốt GA4 hoặc công cụ tương đương"],
    benefits: ["Performance bonus", "Hybrid", "Training theo quý"],
    companyDesc: "Growth agency tập trung vào paid media, conversion và tăng trưởng doanh thu."
  },
  {
    id: 4,
    employerId: 9103,
    title: "Social Media Executive",
    company: "Trendify Studio",
    logo: "TS",
    location: "Hà Nội",
    salary: "12 - 22 triệu",
    type: "Hybrid",
    experience: "1 - 2 năm",
    category: "Social Media",
    skills: ["TikTok", "Facebook", "Content Plan"],
    hot: false,
    applicants: 28,
    posted: "1 ngày trước",
    description: "Quản lý kênh social, xây content calendar và phát triển cộng đồng cho nhiều thương hiệu.",
    requirements: ["Biết bắt trend", "Có kinh nghiệm quản lý fanpage", "Hiểu hành vi người dùng"],
    benefits: ["Làm việc linh hoạt", "Creative environment", "Thưởng campaign"],
    companyDesc: "Studio phát triển nội dung social và creative campaign."
  },
  {
    id: 5,
    employerId: 9104,
    title: "SEO Specialist",
    company: "SearchUp Digital",
    logo: "SD",
    location: "Remote",
    salary: "15 - 28 triệu",
    type: "Remote",
    experience: "2 năm",
    category: "SEO",
    skills: ["SEO", "Search Console", "Keyword Research"],
    hot: false,
    applicants: 19,
    posted: "1 ngày trước",
    description: "Nghiên cứu từ khóa, tối ưu on-page và phối hợp xây dựng nội dung để tăng organic traffic.",
    requirements: ["Có kinh nghiệm SEO", "Biết Search Console", "Tư duy phân tích tốt"],
    benefits: ["Remote", "Thưởng theo kết quả", "Flexible time"],
    companyDesc: "Digital agency chuyên SEO và organic growth."
  },
  {
    id: 6,
    employerId: 9105,
    title: "Graphic Designer - Marketing",
    company: "Pixel Creative Agency",
    logo: "PC",
    location: "Hà Nội",
    salary: "12 - 25 triệu",
    type: "Full-time",
    experience: "1 - 2 năm",
    category: "Design",
    skills: ["Photoshop", "Illustrator", "Branding"],
    hot: false,
    applicants: 24,
    posted: "2 ngày trước",
    description: "Thiết kế social post, key visual, banner quảng cáo và các ấn phẩm truyền thông cho chiến dịch marketing.",
    requirements: ["Có portfolio", "Thành thạo công cụ thiết kế", "Cảm quan thẩm mỹ tốt"],
    benefits: ["Creative workspace", "Training", "Thưởng dự án"],
    companyDesc: "Agency thiết kế và xây dựng nhận diện thương hiệu."
  },
  {
    id: 7,
    employerId: 9106,
    title: "Brand Marketing Executive",
    company: "Nova Lifestyle",
    logo: "NL",
    location: "Hồ Chí Minh",
    salary: "18 - 30 triệu",
    type: "Full-time",
    experience: "2 năm",
    category: "Branding",
    skills: ["Brand Strategy", "Campaign", "Research"],
    hot: true,
    applicants: 15,
    posted: "2 ngày trước",
    description: "Xây dựng kế hoạch thương hiệu và phối hợp triển khai campaign đa kênh.",
    requirements: ["Có kinh nghiệm branding", "Tư duy chiến lược", "Kỹ năng quản lý dự án"],
    benefits: ["Bonus dự án", "Bảo hiểm sức khỏe", "Môi trường chuyên nghiệp"],
    companyDesc: "Thương hiệu lifestyle đang mở rộng thị trường tại Việt Nam."
  },
  {
    id: 8,
    employerId: 9107,
    title: "E-commerce Marketing Specialist",
    company: "ShopHub Vietnam",
    logo: "SH",
    location: "Hồ Chí Minh",
    salary: "15 - 30 triệu",
    type: "Full-time",
    experience: "2 năm",
    category: "E-commerce",
    skills: ["Shopee", "TikTok Shop", "Ads"],
    hot: true,
    applicants: 32,
    posted: "3 ngày trước",
    description: "Quản lý hoạt động marketing trên marketplace, tối ưu quảng cáo và chương trình bán hàng.",
    requirements: ["Có kinh nghiệm marketplace", "Biết tối ưu ads", "Theo dõi số liệu tốt"],
    benefits: ["Thưởng doanh số", "Đào tạo e-commerce", "Team building"],
    companyDesc: "Doanh nghiệp thương mại điện tử đa ngành."
  },
  {
    id: 9,
    employerId: 9108,
    title: "CRM & Email Marketing Executive",
    company: "GrowthMail Labs",
    logo: "GL",
    location: "Hà Nội",
    salary: "14 - 24 triệu",
    type: "Hybrid",
    experience: "1 - 2 năm",
    category: "CRM Marketing",
    skills: ["CRM", "Email Marketing", "Automation"],
    hot: false,
    applicants: 17,
    posted: "4 ngày trước",
    description: "Xây dựng lifecycle campaign, email automation và phân nhóm khách hàng theo hành vi.",
    requirements: ["Hiểu CRM", "Biết email automation", "Có tư duy data-driven"],
    benefits: ["Hybrid", "Thưởng hiệu quả", "Budget khóa học"],
    companyDesc: "Công ty MarTech chuyên CRM, automation và retention marketing."
  },
  {
    id: 10,
    employerId: 9001,
    title: "Marketing Intern",
    company: "Bright Media Vietnam",
    logo: "BM",
    location: "Hà Nội",
    salary: "3 - 6 triệu",
    type: "Internship",
    experience: "Fresher",
    category: "Marketing",
    skills: ["Research", "Social Media", "Excel"],
    hot: false,
    applicants: 0,
    posted: "5 ngày trước",
    description: "Hỗ trợ team marketing nghiên cứu thị trường, chuẩn bị nội dung và theo dõi số liệu chiến dịch.",
    requirements: ["Chăm chỉ", "Có tinh thần học hỏi", "Yêu thích marketing"],
    benefits: ["Hỗ trợ dấu thực tập", "Mentor trực tiếp", "Cơ hội lên chính thức"],
    companyDesc: "Agency chuyên Digital Marketing, Content, SEO và xây dựng thương hiệu cho doanh nghiệp."
  }
];

const DEFAULT_CANDIDATES = [
  {
    id: 101,
    name: "Nguyễn Minh Anh",
    title: "Digital Marketing Specialist",
    avatar: "MA",
    email: "minhanh.marketing@gmail.com",
    phone: "0988 123 456",
    location: "Hà Nội",
    experience: "2 năm",
    skills: ["Facebook Ads", "Google Ads", "GA4", "SEO"],
    education: "Đại học Thương mại — Marketing",
    about: "Digital Marketer tập trung vào paid media, tối ưu hiệu quả chiến dịch và phân tích hành vi khách hàng.",
    appliedJobId: 1,
    appliedAt: "02/09/2026",
    status: "pending",
    score: 94
  },
  {
    id: 102,
    name: "Lê Thu Trang",
    title: "Content Marketing Specialist",
    avatar: "TT",
    email: "thutrang.content@gmail.com",
    phone: "0966 551 991",
    location: "Hà Nội",
    experience: "1.5 năm",
    skills: ["Content Writing", "TikTok", "Facebook", "Copywriting"],
    education: "Học viện Báo chí và Tuyên truyền",
    about: "Content Marketer có thế mạnh storytelling, social content và triển khai nội dung theo insight khách hàng.",
    appliedJobId: 2,
    appliedAt: "01/09/2026",
    status: "accepted",
    score: 91
  },
  {
    id: 103,
    name: "Trần Gia Huy",
    title: "Performance Marketing Executive",
    avatar: "GH",
    email: "giahuy.performance@gmail.com",
    phone: "0977 222 188",
    location: "Hồ Chí Minh",
    experience: "2 năm",
    skills: ["Meta Ads", "Google Ads", "GA4", "Looker Studio"],
    education: "Đại học Kinh tế TP.HCM — Marketing",
    about: "Performance Marketer có kinh nghiệm quản lý ngân sách quảng cáo và tối ưu CPA/ROAS theo dữ liệu.",
    appliedJobId: 3,
    appliedAt: "31/08/2026",
    status: "pending",
    score: 89
  },
  {
    id: 104,
    name: "Phạm Ngọc Mai",
    title: "Marketing Graphic Designer",
    avatar: "NM",
    email: "ngocmai.design@gmail.com",
    phone: "0911 901 202",
    location: "Hà Nội",
    experience: "2 năm",
    skills: ["Photoshop", "Illustrator", "Branding", "Social Design"],
    education: "Đại học Mỹ thuật Công nghiệp",
    about: "Designer chuyên thiết kế ấn phẩm social, key visual và nội dung hình ảnh cho các campaign marketing.",
    appliedJobId: 6,
    appliedAt: "30/08/2026",
    status: "pending",
    score: 86
  }
];

const DEFAULT_MESSAGES = [
  {
    id: 1,
    person: "Bright Media Vietnam",
    avatar: "BM",
    role: "Nhà tuyển dụng",
    last: "Bạn có thể trao đổi nhanh về campaign gần nhất không?",
    time: "21:14",
    unread: 2,
    messages: [
      {from: "them", text: "Chào bạn, team đã xem hồ sơ Marketing của bạn.", time: "20:42"},
      {from: "me", text: "Dạ em cảm ơn anh/chị đã phản hồi ạ.", time: "20:45"},
      {from: "them", text: "Bạn có thể trao đổi nhanh về campaign gần nhất không?", time: "21:14"}
    ]
  },
  {
    id: 2,
    person: "Trendify Studio",
    avatar: "TS",
    role: "Nhà tuyển dụng",
    last: "Team muốn xem thêm một vài nội dung social bạn từng làm.",
    time: "Hôm qua",
    unread: 0,
    messages: [
      {from: "them", text: "Team muốn xem thêm một vài nội dung social bạn từng làm.", time: "16:22"}
    ]
  }
];

const DEFAULT_APPLICATIONS = [
  {
    id: 301,
    jobId: 1,
    employerId: 9001,
    employerName: "Bright Media Vietnam",
    candidateId: 101,
    candidateName: "Nguyễn Minh Anh",
    candidateEmail: "minhanh.marketing@gmail.com",
    candidatePhone: "0988 123 456",
    candidateTitle: "Digital Marketing Specialist",
    candidateSkills: ["Facebook Ads", "Google Ads", "GA4", "SEO"],
    candidateAbout: "Digital Marketer tập trung vào paid media, tối ưu hiệu quả chiến dịch và phân tích hành vi khách hàng.",
    candidateCv: "Marketing-Portfolio-Nguyen-Minh-Anh.pdf",
    date: "02/09/2026",
    status: "pending"
  },
  {
    id: 302,
    jobId: 2,
    employerId: 9001,
    employerName: "Bright Media Vietnam",
    candidateId: 102,
    candidateName: "Lê Thu Trang",
    candidateEmail: "thutrang.content@gmail.com",
    candidatePhone: "0966 551 991",
    candidateTitle: "Content Marketing Specialist",
    candidateSkills: ["Content Writing", "TikTok", "Facebook", "Copywriting"],
    candidateAbout: "Content Marketer có thế mạnh storytelling, social content và triển khai nội dung theo insight khách hàng.",
    candidateCv: "Content-Portfolio-Le-Thu-Trang.pdf",
    date: "01/09/2026",
    status: "accepted"
  },
  {
    id: 303,
    jobId: 3,
    employerId: 9102,
    employerName: "GrowthPilot Agency",
    candidateId: 103,
    candidateName: "Trần Gia Huy",
    candidateEmail: "giahuy.performance@gmail.com",
    candidatePhone: "0977 222 188",
    candidateTitle: "Performance Marketing Executive",
    candidateSkills: ["Meta Ads", "Google Ads", "GA4", "Looker Studio"],
    candidateAbout: "Performance Marketer có kinh nghiệm quản lý ngân sách quảng cáo và tối ưu CPA/ROAS theo dữ liệu.",
    candidateCv: "Performance-Portfolio-Tran-Gia-Huy.pdf",
    date: "31/08/2026",
    status: "pending"
  }
];

const SUNWORK_DATA_VERSION = "marketing-linked-v3";

function seedData() {
  const currentVersion = localStorage.getItem("sunwork_data_version");

  if (currentVersion !== SUNWORK_DATA_VERSION) {
    let oldJobs = [];
    let oldApps = [];
    try { oldJobs = JSON.parse(localStorage.getItem("sunwork_jobs") || "[]"); } catch (_) {}
    try { oldApps = JSON.parse(localStorage.getItem("sunwork_applications") || "[]"); } catch (_) {}

    // Giữ lại job/application do người dùng tự tạo ở những lần test trước.
    const customJobs = oldJobs.filter(j => Number(j.id) > 1000000000000);
    const customApps = oldApps.filter(a => Number(a.id) > 1000000000000);

    localStorage.setItem("sunwork_jobs", JSON.stringify([...customJobs, ...DEFAULT_JOBS]));
    localStorage.setItem("sunwork_candidates", JSON.stringify(DEFAULT_CANDIDATES));
    localStorage.setItem("sunwork_messages", JSON.stringify(DEFAULT_MESSAGES));
    localStorage.setItem("sunwork_applications", JSON.stringify([...customApps, ...DEFAULT_APPLICATIONS]));
    localStorage.setItem("sunwork_saved_jobs", JSON.stringify([1, 4, 7]));
    localStorage.setItem("sunwork_talent_board", JSON.stringify([101, 102]));
    localStorage.setItem("sunwork_data_version", SUNWORK_DATA_VERSION);
    return;
  }

  if (!localStorage.getItem("sunwork_jobs")) localStorage.setItem("sunwork_jobs", JSON.stringify(DEFAULT_JOBS));
  if (!localStorage.getItem("sunwork_candidates")) localStorage.setItem("sunwork_candidates", JSON.stringify(DEFAULT_CANDIDATES));
  if (!localStorage.getItem("sunwork_messages")) localStorage.setItem("sunwork_messages", JSON.stringify(DEFAULT_MESSAGES));
  if (!localStorage.getItem("sunwork_applications")) localStorage.setItem("sunwork_applications", JSON.stringify(DEFAULT_APPLICATIONS));
  if (!localStorage.getItem("sunwork_saved_jobs")) localStorage.setItem("sunwork_saved_jobs", JSON.stringify([1, 4, 7]));
  if (!localStorage.getItem("sunwork_talent_board")) localStorage.setItem("sunwork_talent_board", JSON.stringify([101, 102]));
}


function normalizeJobFields(){
  const raw = localStorage.getItem("sunwork_jobs");
  if(!raw) return;
  const jobs = JSON.parse(raw).map(j=>({...j,
    workingTime:j.workingTime || "Thứ 2 - Thứ 6, 8:30 - 17:30",
    quantity:j.quantity || 1,
    applyMethod:j.applyMethod || "Email"
  }));
  localStorage.setItem("sunwork_jobs", JSON.stringify(jobs));
}

seedData();

// 관리자 정보
export const mockAdminUser = {
  id: 1,
  name: "김관리자",
  email: "admin@hotel.com", 
  role: "super_admin",
  phone: "010-1234-5678",
  avatar: "/api/placeholder/avatar/admin.jpg",
  department: "시스템관리팀",
  createdAt: "2023-01-01",
  lastLogin: "2024-11-19T09:30:00Z",
  permissions: ["all"]
};

// 대시보드 통계
export const mockDashboardStats = {
  todayBookings: 28,
  totalRevenue: 24750000,
  activeHotels: 156,
  newUsers: 43,
  monthlyGrowth: {
    bookings: 15.3,
    revenue: 22.8,
    hotels: 8.1,
    users: 31.2
  },
  chartData: {
    labels: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월"],
    revenue: [2000000, 2500000, 2200000, 2800000, 3000000, 3200000, 3500000, 3100000, 3300000, 3600000, 3800000],
    bookings: [45, 58, 52, 67, 72, 78, 85, 79, 83, 89, 95],
    hotels: [120, 125, 128, 132, 138, 142, 145, 148, 152, 154, 156]
  },
  recentBookings: [
    {
      id: "BK001",
      guestName: "김철수",
      hotelName: "서울 그랜드 호텔",
      checkIn: "2024-11-20",
      checkOut: "2024-11-22",
      status: "confirmed",
      amount: 450000
    },
    {
      id: "BK002", 
      guestName: "이영희",
      hotelName: "부산 오션뷰 리조트",
      checkIn: "2024-11-21",
      checkOut: "2024-11-24",
      status: "pending",
      amount: 680000
    }
  ],
  recentUsers: [
    {
      id: 101,
      name: "박민수",
      email: "park@email.com",
      status: "active",
      joinDate: "2024-11-18"
    },
    {
      id: 102,
      name: "최지은",
      email: "choi@email.com", 
      status: "active",
      joinDate: "2024-11-17"
    }
  ],
  recentReviews: [
    {
      id: 501,
      hotelName: "서울 그랜드 호텔",
      guestName: "김철수",
      rating: 5,
      comment: "완벽한 서비스였습니다!",
      date: "2024-11-18"
    }
  ]
};

// 호텔 데이터
export const mockHotels = [
  {
    id: 1,
    name: "서울 그랜드 호텔",
    address: "서울시 중구 명동1가 123",
    region: "서울",
    status: "approved",
    rating: 4.8,
    reviewCount: 245,
    rooms: 180,
    category: "5성급",
    amenities: ["수영장", "피트니스", "스파", "레스토랑", "비즈니스센터"],
    images: ["/api/placeholder/hotel1-1.jpg", "/api/placeholder/hotel1-2.jpg"],
    price: {
      min: 150000,
      max: 800000
    },
    contact: {
      phone: "02-123-4567",
      email: "info@grandhotel.com"
    },
    createdAt: "2023-06-15",
    ownerInfo: {
      name: "호텔 그랜드 주식회사",
      businessNumber: "123-45-67890"
    }
  },
  {
    id: 2,
    name: "부산 오션뷰 리조트",
    address: "부산시 해운대구 우동 456",
    region: "부산",
    status: "approved", 
    rating: 4.6,
    reviewCount: 189,
    rooms: 220,
    category: "리조트",
    amenities: ["해변접근", "수영장", "키즈클럽", "스파", "골프장"],
    images: ["/api/placeholder/hotel2-1.jpg", "/api/placeholder/hotel2-2.jpg"],
    price: {
      min: 200000,
      max: 1200000
    },
    contact: {
      phone: "051-987-6543",
      email: "info@oceanview.com"
    },
    createdAt: "2023-08-20",
    ownerInfo: {
      name: "오션뷰 관광 주식회사",
      businessNumber: "987-65-43210"
    }
  },
  {
    id: 3,
    name: "제주 힐링 펜션",
    address: "제주시 애월읍 789",
    region: "제주",
    status: "pending",
    rating: 4.3,
    reviewCount: 67,
    rooms: 25,
    category: "펜션",
    amenities: ["바베큐장", "정원", "주차장"],
    images: ["/api/placeholder/hotel3-1.jpg"],
    price: {
      min: 80000,
      max: 250000
    },
    contact: {
      phone: "064-555-7777",
      email: "info@jejuhealing.com"
    },
    createdAt: "2024-10-15",
    ownerInfo: {
      name: "제주힐링펜션",
      businessNumber: "555-77-88990"
    }
  }
];

// 예약 데이터
export const mockBookings = [
  {
    id: "BK001",
    bookingNumber: "HTL-2024-001",
    guestName: "김철수",
    guestEmail: "kim@email.com",
    guestPhone: "010-1111-2222",
    hotelId: 1,
    hotelName: "서울 그랜드 호텔",
    roomType: "디럭스 더블",
    checkIn: "2024-11-20",
    checkOut: "2024-11-22",
    nights: 2,
    guests: 2,
    status: "confirmed",
    paymentStatus: "completed",
    totalAmount: 450000,
    paymentMethod: "신용카드",
    specialRequests: "금연 객실 요청",
    createdAt: "2024-11-15",
    cancelReason: null
  },
  {
    id: "BK002",
    bookingNumber: "HTL-2024-002", 
    guestName: "이영희",
    guestEmail: "lee@email.com",
    guestPhone: "010-3333-4444",
    hotelId: 2,
    hotelName: "부산 오션뷰 리조트",
    roomType: "오션뷰 스위트",
    checkIn: "2024-11-21", 
    checkOut: "2024-11-24",
    nights: 3,
    guests: 4,
    status: "pending",
    paymentStatus: "pending",
    totalAmount: 680000,
    paymentMethod: "계좌이체",
    specialRequests: "레이트 체크아웃",
    createdAt: "2024-11-18",
    cancelReason: null
  },
  {
    id: "BK003",
    bookingNumber: "HTL-2024-003",
    guestName: "박민수", 
    guestEmail: "park@email.com",
    guestPhone: "010-5555-6666",
    hotelId: 1,
    hotelName: "서울 그랜드 호텔",
    roomType: "스탠다드 트윈",
    checkIn: "2024-10-15",
    checkOut: "2024-10-17", 
    nights: 2,
    guests: 2,
    status: "cancelled",
    paymentStatus: "refunded",
    totalAmount: 300000,
    paymentMethod: "신용카드",
    specialRequests: "",
    createdAt: "2024-10-10",
    cancelReason: "개인 사정으로 인한 취소"
  }
];

// 사용자 데이터
export const mockUsers = [
  {
    id: 101,
    name: "김철수",
    email: "kim@email.com",
    phone: "010-1111-2222",
    status: "active",
    type: "regular",
    gender: "male",
    birthDate: "1985-05-15",
    joinDate: "2023-03-20",
    lastLogin: "2024-11-18T14:30:00Z",
    totalBookings: 8,
    totalSpent: 3200000,
    grade: "VIP",
    avatar: "/api/placeholder/avatar/kim.jpg"
  },
  {
    id: 102,
    name: "이영희",
    email: "lee@email.com", 
    phone: "010-3333-4444",
    status: "active",
    type: "regular",
    gender: "female",
    birthDate: "1990-08-22",
    joinDate: "2023-07-10",
    lastLogin: "2024-11-17T10:15:00Z",
    totalBookings: 5,
    totalSpent: 1800000,
    grade: "Gold",
    avatar: "/api/placeholder/avatar/lee.jpg"
  },
  {
    id: 103,
    name: "박민수",
    email: "park@email.com",
    phone: "010-5555-6666", 
    status: "suspended",
    type: "regular",
    gender: "male",
    birthDate: "1988-12-03",
    joinDate: "2024-01-15",
    lastLogin: "2024-10-25T16:45:00Z",
    totalBookings: 2,
    totalSpent: 450000,
    grade: "Silver",
    avatar: "/api/placeholder/avatar/park.jpg"
  },
  {
    id: 104,
    name: "최지은",
    email: "choi@email.com",
    phone: "010-7777-8888",
    status: "active", 
    type: "business",
    gender: "female",
    birthDate: "1983-04-18",
    joinDate: "2023-11-05",
    lastLogin: "2024-11-19T09:20:00Z",
    totalBookings: 25,
    totalSpent: 8500000,
    grade: "VVIP",
    avatar: "/api/placeholder/avatar/choi.jpg",
    businessInfo: {
      companyName: "스타트업 코리아",
      businessNumber: "123-45-67890"
    }
  }
];

// 리뷰 데이터
export const mockReviews = [
  {
    id: 501,
    hotelId: 1,
    hotelName: "서울 그랜드 호텔",
    bookingId: "BK001",
    guestName: "김철수",
    guestEmail: "kim@email.com",
    rating: 5,
    title: "완벽한 호텔 경험!",
    comment: "직원들이 매우 친절하고 시설도 깨끗했습니다. 조식도 훌륭했어요. 다음에 또 이용하겠습니다.",
    images: ["/api/placeholder/review1-1.jpg", "/api/placeholder/review1-2.jpg"],
    createdAt: "2024-11-18T18:30:00Z",
    status: "approved",
    reported: false,
    adminResponse: null,
    helpfulCount: 8
  },
  {
    id: 502, 
    hotelId: 2,
    hotelName: "부산 오션뷰 리조트",
    bookingId: "BK002",
    guestName: "이영희",
    guestEmail: "lee@email.com", 
    rating: 4,
    title: "전망이 정말 좋아요",
    comment: "바다 전망이 환상적이었습니다. 다만 조금 시끄러웠어요.",
    images: ["/api/placeholder/review2-1.jpg"],
    createdAt: "2024-11-17T15:20:00Z",
    status: "pending",
    reported: false,
    adminResponse: null,
    helpfulCount: 3
  },
  {
    id: 503,
    hotelId: 1, 
    hotelName: "서울 그랜드 호텔",
    bookingId: "BK004",
    guestName: "홍길동",
    guestEmail: "hong@email.com",
    rating: 2,
    title: "실망스러웠습니다",
    comment: "방이 너무 더럽고 서비스가 불친절했습니다.",
    images: [],
    createdAt: "2024-11-16T20:10:00Z",
    status: "pending",
    reported: true,
    adminResponse: null,
    helpfulCount: 0,
    reportReason: "부적절한 내용 신고"
  }
];

// 쿠폰 데이터
export const mockCoupons = [
  {
    id: 1,
    name: "신규회원 환영 쿠폰",
    code: "WELCOME2024",
    type: "fixed", // fixed, percent
    discount: 50000,
    minOrderAmount: 200000,
    maxDiscount: 50000,
    description: "첫 예약 고객을 위한 특별 할인 쿠폰",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    usageLimit: 1000,
    usedCount: 234,
    status: "active",
    targetUsers: "new", // all, new, vip
    applicableHotels: "all", // all, specific
    createdAt: "2024-01-01",
    createdBy: "김관리자"
  },
  {
    id: 2,
    name: "VIP 전용 20% 할인",
    code: "VIP20OFF", 
    type: "percent",
    discount: 20,
    minOrderAmount: 500000,
    maxDiscount: 200000,
    description: "VIP 회원만을 위한 특별 할인",
    startDate: "2024-06-01",
    endDate: "2024-11-30", 
    usageLimit: 100,
    usedCount: 67,
    status: "active",
    targetUsers: "vip",
    applicableHotels: "all",
    createdAt: "2024-05-25",
    createdBy: "김관리자"
  },
  {
    id: 3,
    name: "여름 휴가 특가", 
    code: "SUMMER2024",
    type: "percent",
    discount: 15,
    minOrderAmount: 300000,
    maxDiscount: 150000,
    description: "여름 휴가철 특별 할인 이벤트",
    startDate: "2024-07-01",
    endDate: "2024-08-31",
    usageLimit: 500,
    usedCount: 456,
    status: "expired",
    targetUsers: "all",
    applicableHotels: "all",
    createdAt: "2024-06-15",
    createdBy: "이관리자"
  }
];

// 시스템 설정 데이터
export const mockSystemSettings = {
  general: {
    siteName: "호텔 예약 시스템",
    siteDescription: "최고의 호텔 예약 서비스",
    contactEmail: "support@hotelbook.com",
    contactPhone: "1588-1234",
    timezone: "Asia/Seoul",
    language: "ko"
  },
  booking: {
    cancellationPolicy: "체크인 24시간 전까지 무료 취소",
    refundPolicy: "취소 수수료 10%",
    maxAdvanceBooking: 365, // 최대 예약 가능 일수
    minAdvanceBooking: 1    // 최소 예약 가능 일수
  },
  payment: {
    allowedMethods: ["credit_card", "bank_transfer", "kakao_pay"],
    defaultCurrency: "KRW",
    taxRate: 10 // 세율 %
  },
  notification: {
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: false
  },
  security: {
    sessionTimeout: 3600, // 초
    maxLoginAttempts: 5,
    passwordMinLength: 8
  }
};

// 알림 데이터
export const mockNotifications = [
  {
    id: 1,
    type: "booking",
    title: "새로운 예약이 등록되었습니다",
    message: "김철수님이 서울 그랜드 호텔을 예약하셨습니다.",
    isRead: false,
    createdAt: "2024-11-19T09:15:00Z",
    relatedId: "BK001"
  },
  {
    id: 2,
    type: "review",
    title: "새로운 리뷰 신고",
    message: "부적절한 리뷰 내용이 신고되었습니다.",
    isRead: false, 
    createdAt: "2024-11-19T08:30:00Z",
    relatedId: 503
  },
  {
    id: 3,
    type: "hotel",
    title: "호텔 승인 요청",
    message: "제주 힐링 펜션의 승인이 대기 중입니다.",
    isRead: true,
    createdAt: "2024-11-18T16:45:00Z", 
    relatedId: 3
  }
];
import {
  mockAdminUser,
  mockHotels,
  mockBookings,
  mockUsers,
  mockReviews,
  mockCoupons,
  mockDashboardStats,
} from "./mockData";

// API 지연 시뮬레이션
const delay = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock API 응답 생성
const createResponse = (data) => {
  return Promise.resolve(data);
};

// 로컬 스토리지 헬퍼
const getStoredData = (key, initialData) => {
  try {
    const stored = localStorage.getItem(key);
    if (stored) return JSON.parse(stored);
  } catch (e) {
    console.error(e);
  }
  localStorage.setItem(key, JSON.stringify(initialData));
  return initialData;
};

const setStoredData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

// ... (mockAuthApi, mockHotelApi, mockBookingApi, mockUserApi는 기존 유지 - 생략하지 말고 기존 코드 그대로 두세요. 여기선 리뷰/쿠폰/통계만 보여드립니다) ...
// (편의상 위쪽 mockAuthApi 등은 기존 파일 내용을 유지한다고 가정합니다. 아래 mockReviewApi를 교체해주세요.)

export const mockAuthApi = {
    login: async (credentials) => {
      await delay();
      if (credentials.email === "admin@hotel.com" && credentials.password === "admin1234") {
        return createResponse({ token: "mock-jwt-token-" + Date.now(), admin: mockAdminUser });
      }
      if (credentials.email && credentials.password) {
         return createResponse({ token: "mock-business-token-" + Date.now(), admin: { ...mockAdminUser, name: "홍길동 사장님", role: "business" } });
      }
      throw new Error("이메일 또는 비밀번호가 올바르지 않습니다.");
    },
    logout: async () => { await delay(200); return createResponse({ message: "Logged out" }); },
    getMyInfo: async () => { await delay(); return createResponse(mockAdminUser); },
    changePassword: async () => { await delay(); return createResponse({ message: "Success" }); },
    forgotPassword: async () => { await delay(); return createResponse({ message: "Sent" }); },
};

export const mockHotelApi = {
    getHotels: async (params = {}) => {
      await delay();
      let hotels = getStoredData("hotels", mockHotels);
      // 필터 로직
      if (params.search) hotels = hotels.filter(h => h.name.toLowerCase().includes(params.search.toLowerCase()));
      if (params.status) hotels = hotels.filter(h => h.status === params.status);
      if (params.region) hotels = hotels.filter(h => h.region === params.region);
      return createResponse({ hotels, totalPages: 1, currentPage: 1 });
    },
    getHotelById: async (id) => {
      await delay();
      const hotels = getStoredData("hotels", mockHotels);
      const hotel = hotels.find(h => h.id === parseInt(id));
      if(!hotel) throw new Error("Not found");
      return createResponse(hotel);
    },
    createHotel: async (data) => {
      await delay();
      const hotels = getStoredData("hotels", mockHotels);
      const newId = hotels.length > 0 ? Math.max(...hotels.map(h => h.id)) + 1 : 1;
      const newHotel = { id: newId, ...data, status: "pending", createdAt: new Date().toISOString(), rating: 0, reviewCount: 0, price: data.price || {min:0, max:0} };
      hotels.push(newHotel);
      setStoredData("hotels", hotels);
      return createResponse(newHotel);
    },
    updateHotel: async (id, data) => {
        await delay();
        const hotels = getStoredData("hotels", mockHotels);
        const idx = hotels.findIndex(h => h.id === parseInt(id));
        if(idx === -1) throw new Error("Not found");
        hotels[idx] = { ...hotels[idx], ...data };
        setStoredData("hotels", hotels);
        return createResponse(hotels[idx]);
    },
    deleteHotel: async (id) => {
        await delay();
        let hotels = getStoredData("hotels", mockHotels);
        hotels = hotels.filter(h => h.id !== parseInt(id));
        setStoredData("hotels", hotels);
        return createResponse({ message: "Deleted" });
    },
    approveHotel: async (id) => {
        await delay();
        const hotels = getStoredData("hotels", mockHotels);
        const h = hotels.find(x => x.id === parseInt(id));
        if(h) { h.status = "approved"; setStoredData("hotels", hotels); }
        return createResponse({ message: "Approved" });
    },
    rejectHotel: async (id) => {
        await delay();
        const hotels = getStoredData("hotels", mockHotels);
        const h = hotels.find(x => x.id === parseInt(id));
        if(h) { h.status = "rejected"; setStoredData("hotels", hotels); }
        return createResponse({ message: "Rejected" });
    }
};

export const mockBookingApi = {
    getBookings: async () => { await delay(); return createResponse({ bookings: [...mockBookings], totalPages: 1 }); },
    getBookingById: async (id) => { await delay(); return createResponse(mockBookings.find(b=>b.id===id)); },
    updateBookingStatus: async () => { await delay(); return createResponse({}); },
    cancelBooking: async () => { await delay(); return createResponse({}); },
    deleteBooking: async () => { await delay(); return createResponse({}); }
};

export const mockUserApi = {
    getUsers: async () => { await delay(); return createResponse({ users: [...mockUsers], totalPages: 1 }); },
    getUserById: async (id) => { await delay(); return createResponse(mockUsers.find(u=>u.id===parseInt(id))); },
    updateUser: async () => { await delay(); return createResponse({}); },
    deleteUser: async () => { await delay(); return createResponse({}); },
    updateUserStatus: async () => { await delay(); return createResponse({}); },
    getBusinessUsers: async () => { await delay(); return createResponse({ users: [], totalPages: 1 }); }
};

// ★ Mock 리뷰 API (수정됨) ★
export const mockReviewApi = {
  getReviews: async (params = {}) => {
    await delay();
    let reviews = getStoredData("reviews", mockReviews);

    // 필터링: reported가 true인 것만 가져오기 (관리자용)
    if (params.reportedOnly) {
      reviews = reviews.filter((r) => r.reported === true && r.status !== 'rejected');
    }

    // 검색 필터
    if (params.search) {
      reviews = reviews.filter(
        (r) =>
          r.hotelName.toLowerCase().includes(params.search.toLowerCase()) ||
          r.guestName.toLowerCase().includes(params.search.toLowerCase())
      );
    }

    return createResponse({
      reviews: reviews,
      totalPages: 1,
      currentPage: 1,
    });
  },

  getReviewById: async (reviewId) => {
    await delay();
    const reviews = getStoredData("reviews", mockReviews);
    const review = reviews.find((r) => r.id === parseInt(reviewId));
    return createResponse(review);
  },

  // 승인 시 -> 리뷰 삭제
  deleteReview: async (reviewId) => {
    await delay();
    let reviews = getStoredData("reviews", mockReviews);
    reviews = reviews.filter((r) => r.id !== parseInt(reviewId));
    setStoredData("reviews", reviews);
    return createResponse({ message: "Review deleted (Report Approved)" });
  },

  // 거부 시 -> 상태 변경 및 사유 저장
  rejectReport: async (reviewId, reason) => {
    await delay();
    const reviews = getStoredData("reviews", mockReviews);
    const review = reviews.find((r) => r.id === parseInt(reviewId));
    if (review) {
      review.status = "rejected"; // 신고 거부 상태
      review.adminResponse = reason; // 거부 사유 저장
      setStoredData("reviews", reviews);
    }
    return createResponse({ message: "Report rejected" });
  },
  
  // 사업자가 신고하기
  reportReview: async (reviewId, reason) => {
      await delay();
      const reviews = getStoredData("reviews", mockReviews);
      const review = reviews.find((r) => r.id === parseInt(reviewId));
      if (review) {
          review.reported = true;
          review.reportReason = reason;
          review.status = "pending"; // 대기 상태
          setStoredData("reviews", reviews);
      }
      return createResponse({ message: "Reported successfully" });
  }
};

export const mockStatsApi = {
    getDashboardStats: async () => { await delay(); return createResponse(mockDashboardStats); },
    getRevenueStats: async () => { await delay(); return createResponse({}); },
    getBookingStats: async () => { await delay(); return createResponse({}); },
    getUserStats: async () => { await delay(); return createResponse({}); },
    getHotelStats: async () => { await delay(); return createResponse({}); }
};

export const mockCouponApi = {
    getCoupons: async () => { await delay(); let c = getStoredData("coupons", mockCoupons); return createResponse({ coupons: [...c] }); },
    getCouponById: async (id) => { await delay(); let c = getStoredData("coupons", mockCoupons); return createResponse(c.find(x=>x.id===parseInt(id))); },
    createCoupon: async (data) => { await delay(); let c = getStoredData("coupons", mockCoupons); const n={id:c.length+1, ...data, usedCount:0, status:'active', createdAt:new Date().toISOString()}; c.push(n); setStoredData("coupons", c); return createResponse(n); },
    updateCoupon: async (id, data) => { await delay(); let c = getStoredData("coupons", mockCoupons); const i=c.findIndex(x=>x.id===parseInt(id)); if(i>-1){c[i]={...c[i],...data}; setStoredData("coupons", c); return createResponse(c[i]);} },
    deleteCoupon: async (id) => { await delay(); let c = getStoredData("coupons", mockCoupons); c=c.filter(x=>x.id!==parseInt(id)); setStoredData("coupons", c); return createResponse({}); }
};
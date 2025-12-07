import axiosClient from "./axiosClient";

export const adminHotelApi = {
  // [사업자] 내 호텔 목록 조회
  // GET /api/hotel/owner
  getMyHotels: (params) => {
    return axiosClient.get("/hotel/owner", { params });
  },

  // [사업자] 호텔 생성 (이미지 업로드 지원)
  // POST /api/hotel/owner
  createHotel: (data) => {
    // data에 images(파일 배열)나 existingImages가 있는지 확인
    const hasFiles = data.images && data.images.length > 0;
    
    if (hasFiles) {
      const formData = new FormData();
      
      // 모든 키-값 쌍을 FormData에 추가
      Object.keys(data).forEach((key) => {
        if (key === "images") {
          // 이미지 파일 배열 처리
          data.images.forEach((file) => {
            formData.append("images", file);
          });
        } else if (Array.isArray(data[key])) {
          // 기타 배열 데이터 (예: amenities 등)
          data[key].forEach((item) => {
            formData.append(key, item);
          });
        } else {
          // 일반 필드
          formData.append(key, data[key]);
        }
      });

      return axiosClient.post("/hotel/owner", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    }

    // 이미지가 없으면 일반 JSON 전송
    return axiosClient.post("/hotel/owner", data);
  },

  // [사업자] 호텔 정보 수정 (이미지 업로드 지원)
  // PATCH /api/hotel/owner/:hotelId
  updateHotel: (hotelId, data) => {
    const hasFiles = data.images && data.images.length > 0;

    if (hasFiles) {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        if (key === "images") {
          data.images.forEach((file) => formData.append("images", file));
        } else if (key === "existingImages") {
           // 기존 이미지 유지 로직이 백엔드에 있다면 전달 (보통 문자열 배열)
           data.existingImages.forEach(img => formData.append("existingImages", img));
        } else if (Array.isArray(data[key])) {
          data[key].forEach((item) => formData.append(key, item));
        } else {
          formData.append(key, data[key]);
        }
      });

      return axiosClient.patch(`/hotel/owner/${hotelId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    }

    return axiosClient.patch(`/hotel/owner/${hotelId}`, data);
  },

  // [관리자] 승인 대기중인 호텔 목록 조회
  // GET /api/hotel/admin/pending
  getPendingHotels: () => {
    return axiosClient.get("/hotel/admin/pending");
  },

  // [관리자] 호텔 입점 승인
  // PATCH /api/hotel/admin/:hotelId/approve
  approveHotel: (hotelId) => {
    return axiosClient.patch(`/hotel/admin/${hotelId}/approve`);
  },

  // [관리자] 호텔 입점 반려
  // PATCH /api/hotel/admin/:hotelId/reject
  rejectHotel: (hotelId, reason) => {
    return axiosClient.patch(`/hotel/admin/${hotelId}/reject`, { reason });
  },
};

export default adminHotelApi;
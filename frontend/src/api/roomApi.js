import axiosClient from "./axiosClient";

export const roomApi = {
  // 사업자: 특정 호텔의 객실 목록
  getRoomsByHotel: async (hotelId) => {
    return await axiosClient.get(`/room/owner/hotel/${hotelId}`);
  },

  // 사업자: 객실 생성 (FormData 지원)
  createRoom: async (hotelId, data) => {
    return await axiosClient.post(`/room/owner/${hotelId}`, data);
  },

  // 사업자: 객실 수정
  updateRoom: async (roomId, data) => {
    return await axiosClient.patch(`/room/owner/${roomId}`, data);
  },

  // 사업자: 객실 삭제
  deleteRoom: async (roomId) => {
    return await axiosClient.delete(`/room/owner/${roomId}`);
  },

  // 사업자: 객실 이미지 추가 업로드
  uploadRoomImages: async (roomId, formData) => {
    return await axiosClient.post(`/room/owner/${roomId}/images`, formData);
  },
};

export default roomApi;


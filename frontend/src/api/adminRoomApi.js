import axiosClient from "./axiosClient";

export const adminRoomApi = {
  // [사업자] 특정 호텔의 객실 목록 조회
  // GET /api/room/owner/hotel/:hotelId
  getRoomsByHotel: (hotelId) => {
    return axiosClient.get(`/room/owner/hotel/${hotelId}`);
  },

  // [사업자] 객실 생성
  // POST /api/room/owner/:hotelId
  createRoom: (hotelId, data) => {
    return axiosClient.post(`/room/owner/${hotelId}`, data);
  },

  // [사업자] 객실 수정
  // PATCH /api/room/owner/:roomId
  updateRoom: (roomId, data) => {
    return axiosClient.patch(`/room/owner/${roomId}`, data);
  },

  // [사업자] 객실 삭제
  // DELETE /api/room/owner/:roomId
  deleteRoom: (roomId) => {
    return axiosClient.delete(`/room/owner/${roomId}`);
  },
};

export default adminRoomApi;
import axios from "axios";

// Generic Error Handler
const handleError = (error) => {
  console.error("API Error:", error.response?.data || error.message);
  return {
    success: false,
    message: error.response?.data?.message || "An error occurred",
  };
};

export async function registerService(formData) {
  try {
    const { data } = await axios.post("/auth/register", {
      ...formData,
      role: "user",
    });
    return data;
  } catch (error) {
    return handleError(error);
  }
}

export async function loginService(formData) {
  try {
    const { data } = await axios.post("/auth/login", formData);
    return data;
  } catch (error) {
    return handleError(error);
  }
}

export async function checkAuthService() {
  try {
    const { data } = await axios.get("/auth/check-auth");
    return data;
  } catch (error) {
    return handleError(error);
  }
}

export async function mediaUploadService(formData, onProgressCallback) {
  try {
    const { data } = await axios.post("/media/upload", formData, {
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        onProgressCallback(percentCompleted);
      },
    });
    return data;
  } catch (error) {
    return handleError(error);
  }
}

export async function mediaDeleteService(id) {
  try {
    const { data } = await axios.delete(`/media/delete/${id}`);
    return data;
  } catch (error) {
    return handleError(error);
  }
}

export async function fetchInstructorCourseListService() {
  try {
    const { data } = await axios.get(`/instructor/course/get`);
    return data;
  } catch (error) {
    return handleError(error);
  }
}

export async function addNewCourseService(formData) {
  try {
    const { data } = await axios.post(`/instructor/course/add`, formData);
    return data;
  } catch (error) {
    return handleError(error);
  }
}

export async function fetchInstructorCourseDetailsService(id) {
  try {
    const { data } = await axios.get(`/instructor/course/get/details/${id}`);
    return data;
  } catch (error) {
    return handleError(error);
  }
}

export async function updateCourseByIdService(id, formData) {
  try {
    const { data } = await axios.put(
      `/instructor/course/update/${id}`,
      formData
    );
    return data;
  } catch (error) {
    return handleError(error);
  }
}

export async function mediaBulkUploadService(formData, onProgressCallback) {
  try {
    const { data } = await axios.post("/media/bulk-upload", formData, {
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        onProgressCallback(percentCompleted);
      },
    });
    return data;
  } catch (error) {
    return handleError(error);
  }
}

export async function fetchStudentViewCourseListService(query) {
  try {
    const { data } = await axios.get(`/student/course/get?${query}`);
    return data;
  } catch (error) {
    return handleError(error);
  }
}

export async function fetchStudentViewCourseDetailsService(courseId) {
  try {
    const { data } = await axios.get(`/student/course/get/details/${courseId}`);
    return data;
  } catch (error) {
    return handleError(error);
  }
}

export async function checkCoursePurchaseInfoService(courseId, studentId) {
  try {
    const { data } = await axios.get(
      `/student/course/purchase-info/${courseId}/${studentId}`
    );
    return data;
  } catch (error) {
    return handleError(error);
  }
}

export async function createPaymentService(formData) {
  try {
    const { data } = await axios.post(`/student/order/create`, formData);
    return data;
  } catch (error) {
    return handleError(error);
  }
}

export async function captureAndFinalizePaymentService(
  paymentId,
  payerId,
  orderId
) {
  try {
    const { data } = await axios.post(`/student/order/capture`, {
      paymentId,
      payerId,
      orderId,
    });
    return data;
  } catch (error) {
    return handleError(error);
  }
}

export async function fetchStudentBoughtCoursesService(studentId) {
  try {
    const { data } = await axios.get(
      `/student/courses-bought/get/${studentId}`
    );
    return data;
  } catch (error) {
    return handleError(error);
  }
}

export async function getCurrentCourseProgressService(userId, courseId) {
  try {
    const { data } = await axios.get(
      `/student/course-progress/get/${userId}/${courseId}`
    );
    return data;
  } catch (error) {
    return handleError(error);
  }
}

export async function markLectureAsViewedService(userId, courseId, lectureId) {
  try {
    const { data } = await axios.post(
      `/student/course-progress/mark-lecture-viewed`,
      {
        userId,
        courseId,
        lectureId,
      }
    );
    return data;
  } catch (error) {
    return handleError(error);
  }
}

export async function resetCourseProgressService(userId, courseId) {
  try {
    const { data } = await axios.post(
      `/student/course-progress/reset-progress`,
      {
        userId,
        courseId,
      }
    );
    return data;
  } catch (error) {
    return handleError(error);
  }
}

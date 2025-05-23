import { courseCategories } from "@/config";
// import banner from "@/assets/banner-img.png"; // ✅ better practice than '../../../../public'
import { Button } from "@/components/ui/button";
import { useContext, useEffect } from "react";
import { StudentContext } from "@/context/student-context";
import {
  checkCoursePurchaseInfoService,
  fetchStudentViewCourseListService,
} from "@/services";
import { AuthContext } from "@/context/auth-context";
import { useNavigate } from "react-router-dom";

function StudentHomePage() {
  const { studentViewCoursesList, setStudentViewCoursesList } =
    useContext(StudentContext);
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  // Navigate by category
  const handleNavigateToCoursesPage = (getCurrentId) => {
    sessionStorage.removeItem("filters");

    const currentFilter = {
      category: [getCurrentId],
    };

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate("/courses");
  };

  // Fetch all courses
  const fetchAllStudentViewCourses = async () => {
    try {
      const response = await fetchStudentViewCourseListService();
      if (response?.success) {
        setStudentViewCoursesList(response.data);
      } else {
        console.error("Failed to fetch courses");
      }
    } catch (err) {
      console.error("Error fetching courses:", err);
    }
  };

  // Check purchase and navigate
  const handleCourseNavigate = async (courseId) => {
    try {
      const response = await checkCoursePurchaseInfoService(
        courseId,
        auth?.user?._id
      );
      if (response?.success) {
        if (response.data) {
          navigate(`/course-progress/${courseId}`);
        } else {
          navigate(`/course/details/${courseId}`);
        }
      }
    } catch (err) {
      console.error("Navigation error:", err);
    }
  };

  useEffect(() => {
    fetchAllStudentViewCourses();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Banner Section */}
      <section className="flex flex-col lg:flex-row items-center justify-between py-8 px-4 lg:px-8">
        <div className="lg:w-1/2 lg:pr-12">
          <h1 className="text-4xl font-bold mb-4">Learning that gets you</h1>
          <p className="text-xl">
            Skills for your present and your future. Get Started with US
          </p>
        </div>
        <div className="lg:w-full mb-8 lg:mb-0">
          <img
            // src={}
            alt="Banner"
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
      </section>

      {/* Course Categories */}
      <section className="py-8 px-4 lg:px-8 bg-gray-100">
        <h2 className="text-2xl font-bold mb-6">Course Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {courseCategories.map((categoryItem) => (
            <Button
              className="justify-start"
              variant="outline"
              key={categoryItem.id}
              onClick={() => handleNavigateToCoursesPage(categoryItem.id)}
            >
              {categoryItem.label}
            </Button>
          ))}
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-12 px-4 lg:px-8">
        <h2 className="text-2xl font-bold mb-6">Featured Courses</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {studentViewCoursesList && studentViewCoursesList.length > 0 ? (
            studentViewCoursesList.map((courseItem) => (
              <div
                key={courseItem._id}
                onClick={() => handleCourseNavigate(courseItem._id)}
                className="border rounded-lg overflow-hidden shadow cursor-pointer"
              >
                <img
                  src={courseItem.image}
                  alt={courseItem.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold mb-2">{courseItem.title}</h3>
                  <p className="text-sm text-gray-700 mb-2">
                    {courseItem.instructorName}
                  </p>
                  <p className="font-bold text-[16px]">${courseItem.pricing}</p>
                </div>
              </div>
            ))
          ) : (
            <h1>No Courses Found</h1>
          )}
        </div>
      </section>
    </div>
  );
}

export default StudentHomePage;

import { Check, ChevronLeft, ChevronRight, Play } from "lucide-react";
import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import VideoPlayer from "@/components/video-player";
import { AuthContext } from "@/context/auth-context";
import { StudentContext } from "@/context/student-context";
import {
  getCurrentCourseProgressService,
  markLectureAsViewedService,
  resetCourseProgressService,
} from "@/services";

function StudentViewCourseProgressPage() {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const { studentCurrentCourseProgress, setStudentCurrentCourseProgress } =
    useContext(StudentContext);
  const [lockCourse, setLockCourse] = useState(false);
  const [currentLecture, setCurrentLecture] = useState(null);
  const [showCourseCompleteDialog, setShowCourseCompleteDialog] =
    useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("content");
  const { id } = useParams();

  const fetchCurrentCourseProgress = useCallback(async () => {
    setLoading(true);
    const response = await getCurrentCourseProgressService(auth?.user?._id, id);
    if (response?.success) {
      if (!response?.data?.isPurchased) {
        setLockCourse(true);
      } else {
        setStudentCurrentCourseProgress({
          courseDetails: response?.data?.courseDetails,
          progress: response?.data?.progress,
        });

        const curriculum = response?.data?.courseDetails?.curriculum;
        const progress = response?.data?.progress;

        if (response?.data?.completed) {
          setCurrentLecture(curriculum[0]);
          setShowCourseCompleteDialog(true);
          setShowConfetti(true);
        } else if (progress?.length === 0) {
          setCurrentLecture(curriculum[0]);
        } else {
          const lastIndexOfViewedAsTrue = progress.reduceRight(
            (acc, obj, index) => (acc === -1 && obj.viewed ? index : acc),
            -1
          );

          setCurrentLecture(curriculum[lastIndexOfViewedAsTrue + 1]);
        }
      }
    }
    setLoading(false);
  }, [auth?.user?._id, id, setStudentCurrentCourseProgress]);

  async function updateCourseProgress() {
    if (currentLecture) {
      const response = await markLectureAsViewedService(
        auth?.user?._id,
        studentCurrentCourseProgress?.courseDetails?._id,
        currentLecture._id
      );
      if (response?.success) {
        fetchCurrentCourseProgress();
      }
    }
  }

  async function handleRewatchCourse() {
    const response = await resetCourseProgressService(
      auth?.user?._id,
      studentCurrentCourseProgress?.courseDetails?._id
    );
    if (response?.success) {
      setCurrentLecture(null);
      setShowConfetti(false);
      setShowCourseCompleteDialog(false);
      fetchCurrentCourseProgress();
    }
  }

  useEffect(() => {
    fetchCurrentCourseProgress();
  }, [fetchCurrentCourseProgress]);

  useEffect(() => {
    if (currentLecture?.progressValue === 1) updateCourseProgress();
  }, [currentLecture]);

  useEffect(() => {
    if (showConfetti) setTimeout(() => setShowConfetti(false), 15000);
  }, [showConfetti]);

  return (
    <div className="flex flex-col h-screen bg-[#1c1d1f] text-white">
      {showConfetti && <div className="fixed inset-0 z-50">Confetti</div>}

      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate("/student-courses")}
            className="text-black text-sm px-3 py-1 bg-transparent hover:underline"
          >
            <ChevronLeft className="inline h-4 w-4 mr-2" />
            Back to My Courses Page
          </button>
          <h1 className="text-lg font-bold hidden md:block">
            {studentCurrentCourseProgress?.courseDetails?.title}
          </h1>
        </div>
        <button
          onClick={() => setIsSideBarOpen(!isSideBarOpen)}
          className="text-white"
        >
          {isSideBarOpen ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div
          className={`flex-1 ${
            isSideBarOpen ? "mr-[400px]" : ""
          } transition-all duration-300`}
        >
          {loading ? (
            <div className="p-6">Loading course...</div>
          ) : (
            <>
              <VideoPlayer
                width="100%"
                height="500px"
                url={currentLecture?.videoUrl}
                onProgressUpdate={setCurrentLecture}
                progressData={currentLecture}
              />
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2">
                  {currentLecture?.title}
                </h2>
              </div>
            </>
          )}
        </div>

        <div
          className={`fixed top-[64px] right-0 bottom-0 w-[400px] bg-[#1c1d1f] border-l border-gray-700 transition-all duration-300 ${
            isSideBarOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex">
            <button
              onClick={() => setActiveTab("content")}
              className="w-1/2 py-3 bg-gray-700 text-white"
            >
              Course Content
            </button>
            <button
              onClick={() => setActiveTab("overview")}
              className="w-1/2 py-3 bg-gray-800 text-white"
            >
              Overview
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            {activeTab === "content" && (
              <div className="p-4 space-y-4">
                {studentCurrentCourseProgress?.courseDetails?.curriculum.map(
                  (item) => (
                    <div
                      key={item._id}
                      onClick={() => setCurrentLecture(item)}
                      className={`flex items-center space-x-2 text-sm font-bold cursor-pointer px-2 py-1 rounded ${
                        currentLecture?._id === item._id
                          ? "bg-gray-800 text-green-400"
                          : "text-white"
                      }`}
                    >
                      {studentCurrentCourseProgress?.progress?.find(
                        (progressItem) => progressItem.lectureId === item._id
                      )?.viewed ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Play className="h-4 w-4" />
                      )}
                      <span>{item?.title}</span>
                    </div>
                  )
                )}
              </div>
            )}
            {activeTab === "overview" && (
              <div className="p-4">
                <h2 className="text-xl font-bold mb-4">About this course</h2>
                <p className="text-gray-400">
                  {studentCurrentCourseProgress?.courseDetails?.description}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {lockCourse && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white text-black rounded p-6 w-[425px]">
            <h2 className="text-xl font-bold">You can't view this page</h2>
            <p className="text-sm mt-2">
              Please purchase this course to get access
            </p>
          </div>
        </div>
      )}

      {showCourseCompleteDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white text-black rounded p-6 w-[425px]">
            <h2 className="text-xl font-bold mb-4">Congratulations!</h2>
            <p className="mb-4">You have completed the course</p>
            <div className="flex gap-3">
              <button
                onClick={() => navigate("/student-courses")}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                My Courses Page
              </button>
              <button
                onClick={handleRewatchCourse}
                className="px-4 py-2 bg-gray-700 text-white rounded"
              >
                Rewatch Course
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentViewCourseProgressPage;

import express from 'express';
import { academicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.routes';
import { academicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.routes';
import { AcademicSemeterRoutes } from '../modules/academicSemester/academicSemester.routes';
import { buildingRoutes } from '../modules/building/building.route';
import { courseRoutes } from '../modules/course/course.route';
import { facultyRoutes } from '../modules/faculty/faculty.routes';
import { offeredCourseClassScheduleRoutes } from '../modules/offeredCourseClassSchedule/offeredCourseClassSchedule.route';
import { offeredCourseSectionRoutes } from '../modules/offeredCourseSection/offeredCouseSection.route';
import { OfferedCourseRoutes } from '../modules/offeredCourses/offererCourses.route';
import { roomRoutes } from '../modules/rooms/room.route';
import { SemesterRegistrationRoute } from '../modules/semesterRegistration/semesterRegistration.route';
import { studentRoutes } from '../modules/student/student.routes';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: '/academic-semesters',
    route: AcademicSemeterRoutes,
  },
  {
    path: '/academic-faculties',
    route: academicFacultyRoutes,
  },
  {
    path: '/academic-departments',
    route: academicDepartmentRoutes,
  },
  {
    path: '/faculties',
    route: facultyRoutes,
  },
  {
    path: '/students',
    route: studentRoutes,
  },
  {
    path: '/building',
    route: buildingRoutes,
  },
  {
    path: '/room',
    route: roomRoutes,
  },
  {
    path: '/courses',
    route: courseRoutes,
  },
  {
    path: '/semester-registration',
    route: SemesterRegistrationRoute,
  },
  {
    path: '/offered-courses',
    route: OfferedCourseRoutes,
  },
  {
    path: '/offered-courses-section',
    route: offeredCourseSectionRoutes,
  },
  {
    path: '/offered-courses-class-schedule',
    route: offeredCourseClassScheduleRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;

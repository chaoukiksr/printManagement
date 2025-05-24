"use client";
import Image from "next/image";
import { 
  DocumentCheckIcon, 
  ChartBarIcon, 
  UserGroupIcon, 
  ShieldCheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  AcademicCapIcon,
  EnvelopeIcon
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

export default function About() {
  const features = [
    {
      icon: <DocumentCheckIcon className="size-8" />,
      title: "Streamlined Requests",
      description: "Easy-to-use interface for submitting and tracking print requests with real-time status updates."
    },
    {
      icon: <ChartBarIcon className="size-8" />,
      title: "Usage Analytics",
      description: "Comprehensive reporting and analytics to monitor department printing patterns and costs."
    },
    {
      icon: <UserGroupIcon className="size-8" />,
      title: "Department Management",
      description: "Efficient management of multiple departments with role-based access control."
    },
    {
      icon: <ShieldCheckIcon className="size-8" />,
      title: "Secure Approvals",
      description: "Secure workflow for print request approvals with audit trails and authorization controls."
    },
    {
      icon: <ClockIcon className="size-8" />,
      title: "Time-Saving",
      description: "Automated processes that reduce manual work and speed up print request fulfillment."
    },
    {
      icon: <CurrencyDollarIcon className="size-8" />,
      title: "Cost Control",
      description: "Better budget management through detailed cost tracking and resource optimization."
    }
  ];

  const teamMembers = [
    {
      name: "Aribi Abdelali",
      role: "Full Stack Developer",
      email: "a.aribi@univ-boumerdes.dz"
    },
    {
      name: "Laidi Othman",
      role: "UI/UX Designer",
      email: "othmanlaiidi@gmail.com"
    },
    {
      name: "Anes Rouissat",
      role: "UI/UX Designer",
      email: "anesrouissat@gmail.com"
    },
    {
      name: "Bour Youcef",
      role: "Contributor",
      email: ""
    },
    {
      name: "Anes Khelil",
      role: "Speaker & Graphic Designer",
      email: ""
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="about-page container mx-auto px-[30px] py-16">
      {/* Hero Section */}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="text-center max-w-4xl mx-auto mb-20"
      >
        <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl font-bold mb-6">
          About Our Print Management System
        </motion.h1>
        <motion.p variants={itemVariants} className="text-lg text-gray-600 max-w-2xl mx-auto">
          We're revolutionizing how educational institutions handle their printing needs. 
          Our system brings efficiency, transparency, and control to print management.
        </motion.p>
      </motion.div>

      {/* University Section */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-3xl p-8 md:p-12 mb-20"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div variants={itemVariants} className="flex items-center justify-center mb-6">
            <AcademicCapIcon className="size-12 text-primary" />
          </motion.div>
          <motion.h2 variants={itemVariants} className="text-3xl font-bold mb-6 text-center">Faculty of Science</motion.h2>
          <motion.h3 variants={itemVariants} className="text-xl font-semibold mb-4 text-center text-primary">M'hamed Bougara University of Boumerdes</motion.h3>
          <motion.p variants={itemVariants} className="text-lg text-gray-700 text-center leading-relaxed">
            This project is proudly developed by students from the Web Development and Infographics specialty, 
            showcasing our commitment to innovation and excellence in educational technology.
          </motion.p>
        </div>
      </motion.div>

      {/* Mission Section */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-3xl p-8 md:p-12 mb-20"
      >
        <div className="max-w-4xl mx-auto">
          <motion.h2 variants={itemVariants} className="text-3xl font-bold mb-6 text-center">Our Mission</motion.h2>
          <motion.p variants={itemVariants} className="text-lg text-gray-700 text-center leading-relaxed">
            To simplify and optimize the printing process in educational institutions by providing 
            a comprehensive solution that saves time, reduces costs, and promotes sustainable printing practices.
          </motion.p>
        </div>
      </motion.div>

      {/* Features Grid */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="mb-20"
      >
        <motion.h2 variants={itemVariants} className="text-3xl font-bold mb-12 text-center">Key Features</motion.h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-primary mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Team Section */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="mb-20"
      >
        <motion.div variants={itemVariants} className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
          <p className="text-gray-600">
            A dedicated group of talented individuals from the Web Development and Infographics specialty,
            working together to create innovative solutions for educational institutions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative mb-6">
                <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="absolute w-fit text-nowrap -bottom-2 left-1/2 -translate-x-1/2 bg-white px-4 py-1 rounded-full shadow-md">
                  <span className="text-sm font-medium text-primary">{member.role}</span>
                </div>
              </div>

              <div className="text-center">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {member.name}
                </h3>
                
                {member.email && (
                  <a 
                    href={`mailto:${member.email}`}
                    className="inline-flex items-center gap-2 text-gray-600 hover:text-primary transition-colors group/email"
                  >
                    <EnvelopeIcon className="size-5 group-hover/email:scale-110 transition-transform" />
                    <span className="text-sm">{member.email}</span>
                  </a>
                )}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="flex justify-center gap-4">
                  <div className="text-center">
                    <div className="text-sm font-medium text-gray-500">Role</div>
                    <div className="text-primary font-medium">{member.role}</div>
                  </div>
                  {member.email && (
                    <div className="text-center">
                      <div className="text-sm font-medium text-gray-500">Contact</div>
                      <a 
                        href={`mailto:${member.email}`}
                        className="text-primary font-medium hover:underline"
                      >
                        Email
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-block bg-primary/5 rounded-full px-6 py-3">
            <p className="text-primary font-medium">
              Web Development and Infographics Specialty
            </p>
          </div>
        </div>
      </motion.div>

      {/* Benefits Section */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="bg-gradient-to-br from-background to-white rounded-3xl p-8 md:p-12 mb-20"
      >
        <div className="max-w-4xl mx-auto">
          <motion.h2 variants={itemVariants} className="text-3xl font-bold mb-8 text-center">Why Choose Us?</motion.h2>
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <ShieldCheckIcon className="size-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Secure & Reliable</h3>
                  <p className="text-gray-600">Enterprise-grade security with regular backups and updates.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <UserGroupIcon className="size-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">User-Friendly</h3>
                  <p className="text-gray-600">Intuitive interface designed for all user levels.</p>
                </div>
              </div>
            </motion.div>
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <ChartBarIcon className="size-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Data-Driven</h3>
                  <p className="text-gray-600">Comprehensive analytics for informed decision-making.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <ClockIcon className="size-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">24/7 Support</h3>
                  <p className="text-gray-600">Round-the-clock technical support and assistance.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="text-center"
      >
        <motion.h2 variants={itemVariants} className="text-3xl font-bold mb-6">Ready to Get Started?</motion.h2>
        <motion.p variants={itemVariants} className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Join the growing number of institutions that are transforming their print management with our solution.
        </motion.p>
        <motion.div variants={itemVariants} className="flex justify-center">
          <button className="btn">
            <a href="/register">Sign Up Now</a>
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}

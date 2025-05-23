"use client";
import {
  BuildingOfficeIcon,
  UserGroupIcon,
  EnvelopeIcon,
  PrinterIcon,
  DocumentTextIcon,
  ClockIcon,
  QuestionMarkCircleIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { motion } from "framer-motion";

export default function HowItWorks() {
  const [openFaq, setOpenFaq] = useState(null);

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

  const workflowVariants = {
    hidden: { opacity: 0, x: (index) => (index % 2 === 0 ? -100 : 100) },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const faqs = [
    {
      question: "How do I get started as a Faculty?",
      answer:
        "Create an account as a Faculty administrator. Once approved, you can create departments and invite department managers through their email addresses.",
    },
    {
      question: "How do I join as a Department Manager?",
      answer:
        "You'll receive an email invitation from your Faculty administrator. Click the invitation link to set up your account and start managing your department's print requests.",
    },
    {
      question: "How do I join as a Teacher?",
      answer:
        "Your Department Manager will send you an email invitation. Accept the invitation to create your account and start submitting print requests.",
    },
    {
      question: "How do I join as a Printer?",
      answer:
        "Wait for an invitation from your Faculty Administrator. Once invited, you'll receive an email with instructions to set up your printer account.",
    },
    {
      question: "How long does it take to process my print request?",
      answer:
        "Processing time depends on the current queue of requests. You can track your request's position in the queue and estimated completion time in your dashboard.",
    },
  ];

  const roles = [
    {
      icon: <BuildingOfficeIcon className="size-8" />,
      title: "Faculty Administrator",
      description:
        "The main administrator who sets up and manages the entire system",
      color: "from-blue-500/10 to-blue-600/20",
      features: [
        {
          title: "Account Management",
          items: [
            "Create and manage faculty account",
            "Manage administrator access",
          ],
        },
        {
          title: "Department Management",
          items: ["Create new departments", "Assign department managers"],
        },
        {
          title: "System Overview",
          items: [
            "View overall system statistics",
            "Monitor print request volumes",
          ],
        },
      ],
    },
    {
      icon: <UserGroupIcon className="size-8" />,
      title: "Department Manager",
      description: "Manages a specific department and its resources",
      color: "from-green-500/10 to-green-600/20",
      features: [
        {
          title: "Department Control",
          items: ["Set department preferences", "Monitor department activity"],
        },
        {
          title: "User Management",
          items: [
            "Invite teachers to department",
            "Invite admins to department",
          ],
        },
        {
          title: "Request Management",
          items: [
            "Monitor print requests",
            "View requests statistics",
            "Approve requests",
          ],
        },
      ],
    },
    {
      icon: <DocumentTextIcon className="size-8" />,
      title: "Teacher",
      description: "Submits and tracks print requests",
      color: "from-purple-500/10 to-purple-600/20",
      features: [
        {
          title: "Request Management",
          items: [
            "Submit print requests",
            "Specify print information",
            "Track request status",
          ],
        },
        {
          title: "Document Management",
          items: [
            "Upload documents",
            "View print history",
            "Access saved documents",
          ],
        },
        {
          title: "Queue Management",
          items: [
            "Receive status updates ",
            "Check how many requests are in the queue",
          ],
        },
      ],
    },
    {
      icon: <PrinterIcon className="size-8" />,
      title: "Printer",
      description: "Processes and manages print requests",
      color: "from-orange-500/10 to-orange-600/20",
      features: [
        {
          title: "Queue Management",
          items: [
            "View current print queue",
            "Process requests in order",
            "Update request status",
          ],
        },
        {
          title: "Print Processing",
          items: ["Access print documents", "Manage print resources"],
        },
        {
          title: "Status Updates",
          items: ["Update request status", "Notify request completion"],
        },
      ],
    },
  ];

  const workflow = [
    {
      icon: <EnvelopeIcon className="size-8" />,
      title: "Invitation System",
      description:
        "Hierarchical invitation process ensures proper access control",
      details: [
        "Faculty invites Department Managers",
        "Faculty invites Printer",
        "Faculty and Department Managers invite Admins",
        "Department Managers invite Teachers",
        "Each role has specific permissions",
      ],
    },
    {
      icon: <DocumentTextIcon className="size-8" />,
      title: "Request Submission",
      description: "Teachers submit print requests through the system",
      details: [
        "Specify print information",
        "Select document to print if needed",
        "Submit to department queue",
        "Receive confirmation and status updates",
      ],
    },
    {
      icon: <ClockIcon className="size-8" />,
      title: "Queue Management",
      description: "First-come-first-served processing system",
      details: [
        "Requests are queued by submission time",
        "View position in queue",
        "Track estimated wait time",
        "Receive status updates",
      ],
    },
    {
      icon: <PrinterIcon className="size-8" />,
      title: "Print Processing",
      description: "Printers process requests in order",
      details: [
        "View current queue",
        "Process requests sequentially",
        "Update request status",
        "Notify when ready for pickup",
      ],
    },
  ];

  return (
    <div className="how-page container mx-auto px-[30px] py-16">
      {/* Hero Section */}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="text-center max-w-4xl mx-auto mb-20"
      >
        <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl font-bold mb-6">How It Works</motion.h1>
        <motion.p variants={itemVariants} className="text-lg text-gray-600 max-w-2xl mx-auto">
          A streamlined system for managing print requests across departments.
          From faculty administration to print processing, we've made it simple
          and efficient.
        </motion.p>
      </motion.div>

      {/* Roles Section */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="mb-20"
      >
        <motion.h2 variants={itemVariants} className="text-3xl font-bold mb-12 text-center">System Roles</motion.h2>
        <div className="grid lg:grid-cols-2 gap-8">
          {roles.map((role, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Role Header */}
              <div className={`bg-gradient-to-br ${role.color} p-6`}>
                <div className="flex items-center gap-4">
                  <div className="text-primary">{role.icon}</div>
                  <div>
                    <h3 className="text-xl font-bold">{role.title}</h3>
                    <p className="text-gray-600">{role.description}</p>
                  </div>
                </div>
              </div>

              {/* Role Features */}
              <div className="p-6">
                <div className="space-y-6">
                  {role.features.map((feature, i) => (
                    <div key={i} className="space-y-3">
                      <h4 className="font-semibold text-primary">
                        {feature.title}
                      </h4>
                      <ul className="space-y-2">
                        {feature.items.map((item, j) => (
                          <li key={j} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                            <span className="text-gray-600">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Workflow Section */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="mb-20"
      >
        <motion.h2 variants={itemVariants} className="text-3xl font-bold mb-12 text-center">
          System Workflow
        </motion.h2>
        <div className="relative">
          {/* Connection Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-primary/20 -translate-x-1/2 hidden md:block" />

          {/* Steps */}
          <div className="space-y-12">
            {workflow.map((step, index) => (
              <motion.div 
                key={index} 
                className="relative"
                variants={workflowVariants}
                custom={index}
              >
                {/* Step Number */}
                <div className="absolute left-1/2 -translate-x-1/2 -top-4 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold hidden md:flex">
                  {index + 1}
                </div>

                <div className="grid md:grid-cols-2 gap-8 items-center">
                  {/* Left Content */}
                  <div
                    className={`${
                      index % 2 === 0 ? "md:order-1" : "md:order-2"
                    } space-y-4`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-primary">{step.icon}</div>
                      <h3 className="text-2xl font-bold">{step.title}</h3>
                    </div>
                    <p className="text-gray-600">{step.description}</p>
                    <ul className="space-y-2">
                      {step.details.map((detail, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Right Content - Visual */}
                  <div
                    className={`${
                      index % 2 === 0 ? "md:order-2" : "md:order-1"
                    } bg-white rounded-2xl p-6 shadow-lg`}
                  >
                    <div className="aspect-video bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-primary mb-4">{step.icon}</div>
                        <h4 className="font-semibold">{step.title}</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* FAQ Section */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="max-w-4xl mx-auto"
      >
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600">
            Find answers to common questions about our print management system
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white rounded-xl shadow-sm overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <QuestionMarkCircleIcon className="size-6 text-primary" />
                  <span className="font-medium text-left">{faq.question}</span>
                </div>
                <ChevronDownIcon
                  className={`size-5 text-gray-400 transition-transform ${
                    openFaq === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`px-6 transition-all duration-300 ${
                  openFaq === index ? "py-4" : "h-0 py-0"
                }`}
              >
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="text-center mt-20"
      >
        <motion.h2 variants={itemVariants} className="text-3xl font-bold mb-6">Ready to Get Started?</motion.h2>
        <motion.p variants={itemVariants} className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Join the growing number of departments that are transforming their
          print management with our solution.
        </motion.p>
        <motion.div variants={itemVariants} className="flex justify-center">
          <button className="btn">
            <a href="/register">Start Using Now</a>
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}

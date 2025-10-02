import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, CheckCircle2, Sparkles, ArrowRight, ArrowLeft, Mail, Store, Globe2, Users } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";

interface VendorSignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  name: string;
  email: string;
  businessName: string;
  phone: string;
  instagram: string;
  facebook: string;
  tiktok: string;
  website: string;
  existingPlatform: string;
  address: string;
  city: string;
  country: string;
  additionalInfo: string;
}

const TOTAL_STEPS = 3;

export default function VendorSignupModal({ isOpen, onClose }: VendorSignupModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    businessName: "",
    phone: "",
    instagram: "",
    facebook: "",
    tiktok: "",
    website: "",
    existingPlatform: "",
    address: "",
    city: "",
    country: "",
    additionalInfo: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/vendor-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      setIsSuccess(true);
      setTimeout(() => {
        onClose();
        setIsSuccess(false);
        setCurrentStep(1);
        setFormData({
          name: "",
          email: "",
          businessName: "",
          phone: "",
          instagram: "",
          facebook: "",
          tiktok: "",
          website: "",
          existingPlatform: "",
          address: "",
          city: "",
          country: "",
          additionalInfo: "",
        });
      }, 3000);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const canProceed = () => {
    if (currentStep === 1) {
      return formData.name && formData.email && formData.businessName;
    }
    return true;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="pointer-events-auto w-full max-w-5xl max-h-[90vh] overflow-hidden"
            >
              <Card className="relative bg-white rounded-[2.5rem] shadow-2xl border-4 border-black flex flex-col overflow-hidden">
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-6 right-6 z-20 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>

                {/* Success State */}
                {isSuccess ? (
                  <div className="px-6 py-24 text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", duration: 0.6 }}
                    >
                      <CheckCircle2 className="h-20 w-20 text-emerald-500 mx-auto mb-4" />
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
                    <p className="text-gray-600 mb-1">We'll be in touch soon.</p>
                    <p className="text-emerald-600 font-semibold">Stay Upsessed ✨</p>
                  </div>
                ) : (
                  <div className="flex flex-col md:flex-row min-h-[600px] max-h-[85vh] overflow-hidden">
                    {/* Left Sidebar */}
                    <div className="md:w-1/3 bg-gradient-to-br from-gray-50 to-gray-100 p-8 md:p-10 overflow-y-auto">
                      <div className="flex items-center gap-2 mb-8">
                        <Sparkles className="h-6 w-6 text-emerald-500" />
                        <span className="font-bold text-xl">Upsessed</span>
                      </div>

                      <h3 className="text-lg font-semibold mb-6 text-gray-800">Why join Upsessed?</h3>

                      <div className="space-y-6">
                        <div className="flex gap-4">
                          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                            <Store className="h-5 w-5 text-emerald-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800 mb-1">Free to join</h4>
                            <p className="text-sm text-gray-600">100% free sign up, only pay when you sell.</p>
                          </div>
                        </div>

                        <div className="flex gap-4">
                          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                            <Globe2 className="h-5 w-5 text-emerald-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800 mb-1">Global reach</h4>
                            <p className="text-sm text-gray-600">Connect with thrifters worldwide.</p>
                          </div>
                        </div>

                        <div className="flex gap-4">
                          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                            <Users className="h-5 w-5 text-emerald-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800 mb-1">Easy setup</h4>
                            <p className="text-sm text-gray-600">Get started in minutes, no tech skills needed.</p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-10 pt-6 border-t border-gray-200">
                        <p className="text-sm text-gray-600 mb-2">Need help?</p>
                        <a href="mailto:upsessedmarketplace@gmail.com" className="inline-flex items-center gap-2 text-sm text-emerald-600 hover:text-emerald-700 font-medium">
                          <Mail className="h-4 w-4" />
                          upsessedmarketplace@gmail.com
                        </a>
                      </div>
                    </div>

                    {/* Right Form Area */}
                    <div className="md:w-2/3 p-8 md:p-10 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                      {/* Header */}
                      <div className="mb-8">
                        <h2 className="text-3xl font-bold mb-2">Ready to get Upsessed?</h2>
                        <p className="text-gray-600">Built with love for thrift culture.</p>
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-8">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">Step {currentStep} of {TOTAL_STEPS}</span>
                          <span className="text-sm text-gray-500">{Math.round((currentStep / TOTAL_STEPS) * 100)}%</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-emerald-500"
                            initial={{ width: 0 }}
                            animate={{ width: `${(currentStep / TOTAL_STEPS) * 100}%` }}
                            transition={{ duration: 0.3 }}
                          />
                        </div>
                      </div>

                      {error && (
                        <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                          {error}
                        </div>
                      )}

                      {/* Form Steps */}
                      <form onSubmit={handleSubmit}>
                        <AnimatePresence mode="wait">
                          {/* Step 1: Basic Info */}
                          {currentStep === 1 && (
                            <motion.div
                              key="step1"
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -20 }}
                              transition={{ duration: 0.3 }}
                              className="space-y-6"
                            >
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Your Name <span className="text-red-500">*</span>
                                </label>
                                <Input
                                  type="text"
                                  name="name"
                                  value={formData.name}
                                  onChange={handleChange}
                                  required
                                  placeholder="John Doe"
                                  className="h-12 text-base rounded-xl border-2 border-gray-200 focus:border-emerald-500"
                                />
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Email <span className="text-red-500">*</span>
                                </label>
                                <Input
                                  type="email"
                                  name="email"
                                  value={formData.email}
                                  onChange={handleChange}
                                  required
                                  placeholder="you@example.com"
                                  className="h-12 text-base rounded-xl border-2 border-gray-200 focus:border-emerald-500"
                                />
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Business Name <span className="text-red-500">*</span>
                                </label>
                                <Input
                                  type="text"
                                  name="businessName"
                                  value={formData.businessName}
                                  onChange={handleChange}
                                  required
                                  placeholder="Your Thrift Store"
                                  className="h-12 text-base rounded-xl border-2 border-gray-200 focus:border-emerald-500"
                                />
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Phone Number
                                </label>
                                <Input
                                  type="tel"
                                  name="phone"
                                  value={formData.phone}
                                  onChange={handleChange}
                                  placeholder="+1 (555) 123-4567"
                                  className="h-12 text-base rounded-xl border-2 border-gray-200 focus:border-emerald-500"
                                />
                              </div>
                            </motion.div>
                          )}

                          {/* Step 2: Store Details */}
                          {currentStep === 2 && (
                            <motion.div
                              key="step2"
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -20 }}
                              transition={{ duration: 0.3 }}
                              className="space-y-6"
                            >
                              <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    City
                                  </label>
                                  <Input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    placeholder="Toronto"
                                    className="h-12 text-base rounded-xl border-2 border-gray-200 focus:border-emerald-500"
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Country
                                  </label>
                                  <Input
                                    type="text"
                                    name="country"
                                    value={formData.country}
                                    onChange={handleChange}
                                    placeholder="Canada"
                                    className="h-12 text-base rounded-xl border-2 border-gray-200 focus:border-emerald-500"
                                  />
                                </div>
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Address
                                </label>
                                <Input
                                  type="text"
                                  name="address"
                                  value={formData.address}
                                  onChange={handleChange}
                                  placeholder="123 Main St"
                                  className="h-12 text-base rounded-xl border-2 border-gray-200 focus:border-emerald-500"
                                />
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Instagram
                                </label>
                                <Input
                                  type="text"
                                  name="instagram"
                                  value={formData.instagram}
                                  onChange={handleChange}
                                  placeholder="@yourstore"
                                  className="h-12 text-base rounded-xl border-2 border-gray-200 focus:border-emerald-500"
                                />
                              </div>

                              <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Facebook
                                  </label>
                                  <Input
                                    type="text"
                                    name="facebook"
                                    value={formData.facebook}
                                    onChange={handleChange}
                                    placeholder="facebook.com/yourstore"
                                    className="h-12 text-base rounded-xl border-2 border-gray-200 focus:border-emerald-500"
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    TikTok
                                  </label>
                                  <Input
                                    type="text"
                                    name="tiktok"
                                    value={formData.tiktok}
                                    onChange={handleChange}
                                    placeholder="@yourstore"
                                    className="h-12 text-base rounded-xl border-2 border-gray-200 focus:border-emerald-500"
                                  />
                                </div>
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Website
                                </label>
                                <Input
                                  type="url"
                                  name="website"
                                  value={formData.website}
                                  onChange={handleChange}
                                  placeholder="https://yourstore.com"
                                  className="h-12 text-base rounded-xl border-2 border-gray-200 focus:border-emerald-500"
                                />
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Existing Platform
                                </label>
                                <select
                                  name="existingPlatform"
                                  value={formData.existingPlatform}
                                  onChange={handleChange}
                                  className="w-full h-12 px-3 py-2 text-base border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                >
                                  <option value="">Select platform (if applicable)</option>
                                  <option value="etsy">Etsy</option>
                                  <option value="shopify">Shopify</option>
                                  <option value="poshmark">Poshmark</option>
                                  <option value="depop">Depop</option>
                                  <option value="mercari">Mercari</option>
                                  <option value="ebay">eBay</option>
                                  <option value="other">Other</option>
                                  <option value="none">None</option>
                                </select>
                              </div>
                            </motion.div>
                          )}

                          {/* Step 3: Tell Us More */}
                          {currentStep === 3 && (
                            <motion.div
                              key="step3"
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -20 }}
                              transition={{ duration: 0.3 }}
                              className="space-y-6"
                            >
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Tell us about your store
                                </label>
                                <textarea
                                  name="additionalInfo"
                                  value={formData.additionalInfo}
                                  onChange={handleChange}
                                  placeholder="Tell us about your store, products, what makes you unique, or anything else you'd like us to know..."
                                  rows={8}
                                  className="w-full px-4 py-3 text-base border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none"
                                />
                              </div>

                              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                                <p className="text-sm text-emerald-800">
                                  <strong>Almost there!</strong> After you submit, we'll review your application and get back to you within 2-3 business days.
                                </p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Navigation Buttons */}
                        <div className="flex items-center justify-between mt-8 pt-6 border-t">
                          {currentStep > 1 ? (
                            <Button
                              type="button"
                              variant="outline"
                              onClick={handleBack}
                              className="gap-2"
                            >
                              <ArrowLeft className="h-4 w-4" />
                              Go back
                            </Button>
                          ) : (
                            <div />
                          )}

                          <div className="flex gap-3">
                            {currentStep > 1 && currentStep < TOTAL_STEPS && (
                              <Button
                                type="button"
                                variant="ghost"
                                onClick={handleNext}
                                className="text-gray-500 hover:text-gray-700"
                              >
                                Skip
                              </Button>
                            )}

                            {currentStep < TOTAL_STEPS ? (
                              <Button
                                type="button"
                                onClick={handleNext}
                                disabled={!canProceed()}
                                className="gap-2"
                              >
                                Next step
                                <ArrowRight className="h-4 w-4" />
                              </Button>
                            ) : (
                              <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="gap-2"
                              >
                                {isSubmitting ? (
                                  <>
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Submitting...
                                  </>
                                ) : (
                                  <>
                                    <Sparkles className="h-4 w-4" />
                                    Let's get started!
                                  </>
                                )}
                              </Button>
                            )}
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </Card>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

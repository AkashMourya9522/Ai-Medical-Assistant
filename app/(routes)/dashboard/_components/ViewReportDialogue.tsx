import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { sessionDetailsType } from "../voice-call/[sessionId]/page";
import moment from "moment";

const ReportListItem = ({ title, items }: { title: string; items: string[] }) => {
  if (!items || items.length === 0) return null;

  return (
    <div>
      <h3 className="font-bold text-gray-700">{title}:</h3>
      <ul className="list-disc list-inside pl-2 mt-1 space-y-1 text-gray-600">
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

function ViewReportDialogue({ record }: { record: sessionDetailsType }) {
 const report =
    record.report && typeof record.report === "string"
      ? JSON.parse(record.report)
      : record.report;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="w-full">
          View Report
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-gray-800">
            Medical Voice Agent Report
          </DialogTitle>
          <DialogDescription>
            A detailed summary of the consultation.
          </DialogDescription>
        </DialogHeader>

        
        <div className="mt-4 space-y-6 text-gray-800 max-h-[50vh] overflow-y-auto border rounded-lg bg-white shadow-inner p-5">
          {report ? (
            <div className="space-y-4 p-4 border rounded-lg">
              <h2 className="text-lg font-semibold text-blue-600 border-b pb-2">
                🩺 AI-Generated Summary
              </h2>
              <div className="space-y-3">
                <p>
                  <span className="font-bold">Chief Complaint:</span>{" "}
                  {report.chiefComplaint}
                </p>
                <p>
                  <span className="font-bold">Summary:</span> {report.summary}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <p>
                  <span className="font-bold">Symptom Duration:</span>{" "}
                  {report.duration || "Not mentioned"}
                </p>
                <p>
                  <span className="font-bold">Severity:</span>{" "}
                  {report.severity || "Not mentioned"}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6 pt-4">
                <ReportListItem title="Symptoms Mentioned" items={report.symptoms} />
                <ReportListItem
                  title="Medications Mentioned"
                  items={report.medicationsMentioned}
                />
              </div>
               <div className="pt-2">
                 <ReportListItem title="✅ Recommendations" items={report.recommendations} />
               </div>
            </div>
          ) : (
            <div className="text-center py-4 bg-gray-50 rounded-lg">
                <p className="text-gray-500">No AI report has been generated for this session yet.</p>
            </div>
          )}

          <div className="space-y-4 p-4 border rounded-lg">
            <h2 className="text-lg font-semibold text-blue-600 border-b pb-2">
              📝 Consultation Info
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <p>
                <span className="font-bold">Doctor Agent:</span>{" "}
                {record.selectedDoctor.specialist}
              </p>
              <p>
                <span className="font-bold">Consult Date:</span>{" "}
                {moment(record.createdOn).format("MMMM Do YYYY, h:mm a")}
              </p>
              <p className="col-span-full">
                <span className="font-bold">My Notes:</span>{" "}
                {record.notes || "No notes were taken."}
              </p>
            </div>
          </div>
        </div>

        <DialogFooter className="mt-4 pt-4 border-t">
          <p className="text-xs text-center font-semibold text-gray-500 w-full">
            This report is AI-generated for informational use only. Please
            consult a doctor before making any medical decisions.
          </p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ViewReportDialogue;
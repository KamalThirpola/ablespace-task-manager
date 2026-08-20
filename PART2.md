# Part 2 — AbleSpace Take Data Workflow

## Screen reviewed

The assessment asks the candidate to explore the **AbleSpace Take Data screen from the Caseload tab** and submit either a written workflow with screenshots or a video walkthrough. The supplied assessment screenshot shows the Caseload table with student records and a **Take Data** action for each row.

## Workflow in my own words

1. Open the AbleSpace workspace and navigate to **Caseload**.
2. Review the student list in the main table. The visible columns include student information such as full name, last name, IEP due date, eval due date, collaborators, service time, school and actions.
3. Use the student search field when a specific student needs to be located.
4. Select **Take Data** on the relevant student row to begin the data-entry workflow for that student.
5. Complete or review the required data for the selected student, then return to the Caseload list to continue with another student.
6. The row-level action keeps the workflow tied to the correct student and avoids requiring the user to navigate through several unrelated screens.

## UX / UI improvements identified

- Add a clearer loading state after clicking **Take Data** so users know the action is being processed.
- Show a confirmation/toast after data is successfully saved.
- Preserve the current student and table position when the user returns from the data-entry screen.
- Add keyboard navigation and visible focus states to the table and row actions.
- Improve responsive behavior for the wide Caseload table with a sticky first column and horizontal scrolling on smaller screens.
- Add a filter for students with upcoming IEP/evaluation due dates.
- Make destructive or irreversible actions require confirmation.
- Display meaningful empty, error and offline states instead of leaving a blank table.

## Source

This document is based on the supplied AbleSpace Full Stack Developer assessment, page 2, which specifically requests a workflow explanation and UX/UI or functionality improvements for the Caseload → Take Data experience.

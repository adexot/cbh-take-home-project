# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

## Assumption
- I'm assuming that the Facilities would always provide the Custom Id field for the shift, we don't care about the uniqueness.
- The Facilities have a shift form, where they provide the shift details.
- We make an assumption that the length of the Custom Id field is max 50.

## Todo
1. Update Shifts table to include new `custom_agent_id` field.
2. Add provision for facilities to save/update `Agent ID` for each Agent they work with.
3. Replace internal database agent `id` with new `custom_agent_id` for Agents on the generated PDF report.

## Tickets
### 1. Update Shifts table to include new `custom_agent_id` field.

### Tasks
- Add a new DB migration to add a new `varchar(50)` field in Shifts table called `custom_agent_id`.
- The field should be nullable with default set to `null`.

### Acceptance
- Shifts table should have a new nullable field of type `varchar(50)` named `custom_agent_id`.

### Estimated Time
- 1 hour

### 2. Add provision for facilities to save/update `custom_agent_id` for each Agent they work with.

### Tasks
- Add a new input field `custom_agent_id` to the Shift form to allow them provide the value. This can be optional.
- Validate that the `custom_agent_id` field when provided is not beyond 50 chars.
- Update the save and update functions to capture the new `custom_agent_id` field and persist it to the Shift table.

### Acceptance
- Facilities should be able to add `custom_agent_id` to their shift form
- Write UI test to ensure the `custom_agent_id` field is displayed
- Write a integration test to ensure the `custom_agent_id` is captured.

### Estimated Time
- 5 hours

### 3. Replace internal database id with new Custom Id for Agents on the generated PDF report.

### Tasks
- Update `generateReport` function to override internal database id in Agents metadata with the new `custom_agent_id` in Shifts data before converting to PDF.

### Acceptance
- New converted PDF report `id` should match the Shifts `custom_agent_id` if it is present.

### Estimated Time
- 1 hours

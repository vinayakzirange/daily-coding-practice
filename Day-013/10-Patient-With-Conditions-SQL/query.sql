-- Problem: Patient With Conditions
-- Topic: SQL / String Matching / LIKE / Regex
-- Language: SQL
--
-- Approach:
-- Select patient_id, patient_name, and conditions where conditions contain 'DIAB1'
-- at the start of conditions string or preceded by a space.

SELECT patient_id, patient_name, conditions
FROM Patients
WHERE conditions LIKE 'DIAB1%' OR conditions LIKE '% DIAB1%';

-- Problem: Tree Node Classification
-- Topic: SQL / CASE WHEN / Subquery / Tree Hierarchy
-- Language: SQL
--
-- Approach:
-- Classify each node id as:
-- 'Root' if p_id IS NULL.
-- 'Inner' if p_id IS NOT NULL AND id IS IN (SELECT DISTINCT p_id FROM Tree).
-- 'Leaf' otherwise.

SELECT 
    id,
    CASE 
        WHEN p_id IS NULL THEN 'Root'
        WHEN id IN (SELECT DISTINCT p_id FROM Tree WHERE p_id IS NOT NULL) THEN 'Inner'
        ELSE 'Leaf'
    END AS type
FROM Tree;

-- Problem Name: Tree Node Classification
-- Problem Statement: Each node in the tree can be one of three types:
-- 1. "Root": If the node is the root of the tree (p_id is NULL).
-- 2. "Inner": If the node is neither a Root nor a Leaf (has p_id and is also a p_id for another node).
-- 3. "Leaf": If the node is a Leaf node (has p_id but is not a p_id for any other node).
--
-- Schema:
-- Tree (id INT, p_id INT)

SELECT 
    id,
    CASE 
        WHEN p_id IS NULL THEN 'Root'
        WHEN id IN (SELECT DISTINCT p_id FROM Tree WHERE p_id IS NOT NULL) THEN 'Inner'
        ELSE 'Leaf'
    END AS type
FROM Tree;

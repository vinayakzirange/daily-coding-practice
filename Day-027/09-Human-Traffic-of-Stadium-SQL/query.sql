-- Problem: Human Traffic of Stadium (LeetCode 601)
-- Language: SQL
-- Difficulty: Hard / Medium-Hard

WITH FilteredStadium AS (
    SELECT 
        id, 
        visit_date, 
        people,
        id - ROW_NUMBER() OVER (ORDER BY id) AS island_grp
    FROM Stadium
    WHERE people >= 100
),
IslandCounts AS (
    SELECT 
        id, 
        visit_date, 
        people,
        COUNT(*) OVER (PARTITION BY island_grp) AS grp_count
    FROM FilteredStadium
)
SELECT id, visit_date, people
FROM IslandCounts
WHERE grp_count >= 3
ORDER BY visit_date ASC;

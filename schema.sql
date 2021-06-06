CREATE TABLE topics (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  inserted_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  title text NOT NULL,
  slug text,
  parent_id uuid,
  item_id uuid,

);

CREATE UNIQUE INDEX
unique_parent_id_slug_idx ON topics
(COALESCE(parent_id, '00000000-0000-0000-0000-000000000000'), slug);

ALTER TABLE topics
ADD CONSTRAINT CHECK
  (parent_id <> '00000000-0000-0000-0000-000000000000');

ALTER TABLE topics
ADD CONSTRAINT topics_unique_root_slug
USING INDEX topics_unique_root_slug_idx

CREATE TABLE tests (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  inserted_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE items (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  inserted_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  title text,
  video_url text,
  content text,
  test_id uuid
);


-- algebra/inequalities/lol
-- algebra/calculus
-- physics/calculus
DROP VIEW IF EXISTS topics_tree;
CREATE OR REPLACE RECURSIVE VIEW topics_tree (
  id,
  title,
  parent_id,
  item_id,
  slug,
  path
) AS
  SELECT
    t1.id,
    t1.title,
    t1.parent_id,
    t1.item_id,
    t1.slug,
    t1.slug as path
  FROM
    topics t1
  WHERE
    parent_id is null
  UNION ALL
    SELECT
      t2.id,
      t2.title,
      t2.parent_id,
      t2.item_id,
      t2.slug,
      t_tree.path || '/' || t2.slug as path
    FROM
      topics t2
    INNER JOIN
      topics_tree t_tree ON t2.parent_id = t_tree.id;

-- CREATE TABLE contributions (
--     user uuid,
--     topic uuid
-- )

-- CREATE TABLE discussions (

-- )

-- Update only unchanged New York sample locations in an existing demo database.
BEGIN;
CREATE TEMP TABLE demo_areas (email text, old_city text, city text, old_zip text, zip text) ON COMMIT DROP;
INSERT INTO demo_areas VALUES
  ('sarah@pawhub.demo','Brooklyn, NY','Indiranagar, Bengaluru','11215','560038'),
  ('marcus@pawhub.demo','Queens, NY','Koramangala, Bengaluru','11375','560034'),
  ('lena@pawhub.demo','Manhattan, NY','Jayanagar, Bengaluru','10003','560041'),
  ('carla@pawhub.demo','Brooklyn, NY','HSR Layout, Bengaluru','11211','560102'),
  ('jordan@pawhub.demo','Queens, NY','Whitefield, Bengaluru','11101','560066'),
  ('emma@pawhub.demo','Brooklyn, NY','Indiranagar, Bengaluru',NULL,NULL),
  ('david@pawhub.demo','Brooklyn, NY','Koramangala, Bengaluru',NULL,NULL);
UPDATE providers p SET city=a.city, zip_code=a.zip
FROM users u JOIN demo_areas a ON u.email=a.email
WHERE p.user_id=u.id AND p.city=a.old_city AND p.zip_code=a.old_zip;
UPDATE users u SET city=a.city FROM demo_areas a WHERE u.email=a.email AND u.city=a.old_city;
COMMIT;

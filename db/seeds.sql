INSERT INTO departments (name) 
VALUES 
 ('Legal'),
 ('Research and Development'),
 ('Legal'),
 ('Accounting'),
 ('Human Resources'),
 ('Training'),
 ('Marketing'),
 ('Support'),
 ('Product Management'),
 ('Services');

INSERT INTO roles (title, salary, department_id) 
VALUES
  ('Developer II', 6994.76, 2),
  ('Physical Therapy Assistant', 135536.6, 2),
  ('Librarian', 239129.59, 5),
  ('Help Desk Technician', 160365.75, 9),
  ('Director of Sales', 207380.76, 3),
  ('Director of Sales', 102942.87, 1),
  ('Project Manager', 156642.57, 1),
  ('Human Resources Assistant III', 271925.45, 9),
  ('Help Desk Operator', 29480.81, 5),
  ('Administrative Assistant IV', 94711.65, 8);

INSERT INTO employees (first_name, last_name, role_id, manager_id) 
VALUES
 ('Patricio', 'O'' Mara', 8, 10),
 ('Elonore', 'Robbel', 6, 7),
 ('Garreth', 'Sinisbury', 5, 1),
 ('Hernando', 'Luke', 7, 3),
 ('Isaiah', 'Mason', 5, 3),
 ('Chryste', 'Sposito', 3, 10),
 ('Melania', 'Chalke', 7, 2),
 ('Amargo', 'Gounod', 6, 4),
 ('Hebert', 'Eteen', 10, 9),
 ('Vernice', 'Hansie', 7, 4);
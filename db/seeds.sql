
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
  ('Developer II', 6994.76, 1),
  ('Physical Therapy Assistant', 135536.6, 1),
  ('Librarian', 239129.59, 2),
  ('Help Desk Technician', 160365.75, 3),
  ('Director of Sales', 207380.76, 3),
  ('Director of Sales', 102942.87, 4),
  ('Project Manager', 156642.57, 4),
  ('Human Resources Assistant III', 271925.45, 5),
  ('Help Desk Operator', 29480.81, 5),
  ('Administrative Assistant IV', 94711.65, 6);



INSERT INTO employees (first_name, last_name, role_id, manager_id) 
VALUES
 ('Patricio', 'O'' Mara', 1, null),
 ('Elonore', 'Robbel', 2, 1),
 ('Garreth', 'Sinisbury', 2, 1),
 ('Hernando', 'Luke', 2, 3),
 ('Isaiah', 'Mason', 3, 3),
 ('Chryste', 'Sposito', 3, 4),
 ('Melania', 'Chalke', 4, 4),
 ('Amargo', 'Gounod', 4, 2),
 ('Hebert', 'Eteen', 5, 6),
 ('Vernice', 'Hansie', 8, 8);


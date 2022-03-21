INSERT INTO department (id, name)
  VALUES
        (1, 'd_a'),
        (2, 'd_b'),
        (3, 'd_c');

INSERT INTO role (id, title, salary, department_id)
  VALUES -- 'employees'
        (1, 'e', 50.00, 1),
        (2, 'e', 100.00, 2),
        (3, 'e', 150.00, 3),
        --  'managers'
        (4, 'm', 150.00, 1),
        (5, 'm', 200.00, 2),
        (6, 'm', 250.00, 3);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
  VALUES
        (1, 'fn_a', 'ln_a', 1, 4),
        (2, 'fn_b', 'ln_b', 1, 4),
        (3, 'fn_c', 'ln_c', 1, 4),
        (4, 'fn_d', 'ln_d', 4, null),
        
        (5, 'fn_e', 'ln_e', 2, 8),
        (6, 'fn_f', 'ln_f', 2, 8),
        (7, 'fn_g', 'ln_g', 2, 8),
        (8, 'fn_h', 'ln_h', 5, null),

        (9, 'fn_i', 'ln_i', 3, 12),
        (10, 'fn_j', 'ln_j', 3, 12),
        (11, 'fn_k', 'ln_k', 3, 12),
        (12, 'fn_l', 'ln_l', 6, null);
INSERT INTO departments (name)
  VALUES
        ('d_a'),
        ('d_b'),
        ('d_c');

INSERT INTO roles (title, salary, department_id)
  VALUES -- 'employees'
        ('e_1', 50.00, 1),
        ('e_2', 100.00, 2),
        ('e_3', 150.00, 3),
        --  'managers'
        ('m_1', 150.00, 1),
        ('m_2', 200.00, 2),
        ('m_3', 250.00, 3);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
  VALUES
        ('fn_a', 'ln_a', 1, 4),
        ('fn_b', 'ln_b', 1, 4),
        ('fn_c', 'ln_c', 1, 4),
        ('fn_d', 'ln_d', 4, null),
        
        ('fn_e', 'ln_e', 2, 8),
        ('fn_f', 'ln_f', 2, 8),
        ('fn_g', 'ln_g', 2, 8),
        ('fn_h', 'ln_h', 5, null),

        ('fn_i', 'ln_i', 3, 12),
        ('fn_j', 'ln_j', 3, 12),
        ('fn_k', 'ln_k', 3, 12),
        ('fn_l', 'ln_l', 6, null);
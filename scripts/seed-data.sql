-- Seed data for the fabric factory management system

-- Insert sample categories
INSERT INTO categories (name, description, status) VALUES
('Cotton Fabrics', 'High-quality cotton materials for various applications', 'active'),
('Silk Collection', 'Premium silk fabrics for luxury garments', 'active'),
('Wool Blends', 'Warm and comfortable wool blend materials', 'active'),
('Synthetic Fabrics', 'Durable synthetic materials for industrial use', 'active'),
('Linen Collection', 'Natural linen fabrics for summer wear', 'active');

-- Insert sample fabrics
INSERT INTO fabrics (name, code, category_id, color, width, weight, price, stock, description, status) VALUES
('Premium Cotton', 'PC001', (SELECT id FROM categories WHERE name = 'Cotton Fabrics'), 'White', 150, 200, 25.50, 120, 'High-quality premium cotton fabric', 'in-stock'),
('Organic Cotton', 'OC002', (SELECT id FROM categories WHERE name = 'Cotton Fabrics'), 'Natural', 140, 180, 28.00, 85, 'Certified organic cotton material', 'in-stock'),
('Silk Blend', 'SB003', (SELECT id FROM categories WHERE name = 'Silk Collection'), 'Cream', 140, 180, 45.00, 15, 'Luxurious silk blend material', 'low-stock'),
('Pure Silk', 'PS004', (SELECT id FROM categories WHERE name = 'Silk Collection'), 'Ivory', 135, 160, 65.00, 32, '100% pure silk fabric', 'in-stock'),
('Wool Mix', 'WM005', (SELECT id FROM categories WHERE name = 'Wool Blends'), 'Gray', 160, 300, 35.75, 0, 'Warm wool blend for winter garments', 'out-of-stock'),
('Merino Wool', 'MW006', (SELECT id FROM categories WHERE name = 'Wool Blends'), 'Charcoal', 155, 280, 42.00, 28, 'Premium merino wool fabric', 'in-stock');

-- Insert sample readymade products
INSERT INTO products (name, sku, category, size, color, price, cost, stock, description, status) VALUES
('Cotton Casual Shirt', 'CCS001', 'Shirts', 'M', 'Blue', 45.00, 25.00, 25, 'Comfortable cotton casual shirt for everyday wear', 'available'),
('Cotton Casual Shirt', 'CCS002', 'Shirts', 'L', 'Blue', 45.00, 25.00, 18, 'Comfortable cotton casual shirt for everyday wear', 'available'),
('Silk Formal Dress', 'SFD001', 'Dresses', 'M', 'Black', 120.00, 70.00, 8, 'Elegant silk formal dress for special occasions', 'low-stock'),
('Silk Formal Dress', 'SFD002', 'Dresses', 'L', 'Black', 120.00, 70.00, 12, 'Elegant silk formal dress for special occasions', 'available'),
('Wool Winter Coat', 'WWC001', 'Coats', 'XL', 'Gray', 180.00, 110.00, 0, 'Warm wool winter coat for cold weather', 'out-of-stock'),
('Linen Summer Shirt', 'LSS001', 'Shirts', 'M', 'White', 38.00, 22.00, 35, 'Breathable linen shirt for summer', 'available'),
('Cotton Polo Shirt', 'CPS001', 'Shirts', 'L', 'Navy', 42.00, 24.00, 22, 'Classic cotton polo shirt', 'available');

-- Insert sample orders for reporting
INSERT INTO orders (order_number, customer_name, customer_email, total_amount, profit_amount, status, order_date) VALUES
('ORD-2024-001', 'John Smith', 'john@example.com', 135.00, 55.00, 'completed', '2024-01-15'),
('ORD-2024-002', 'Sarah Johnson', 'sarah@example.com', 240.00, 100.00, 'completed', '2024-01-18'),
('ORD-2024-003', 'Mike Brown', 'mike@example.com', 90.00, 40.00, 'completed', '2024-01-22'),
('ORD-2024-004', 'Emily Davis', 'emily@example.com', 180.00, 70.00, 'completed', '2024-02-05'),
('ORD-2024-005', 'David Wilson', 'david@example.com', 320.00, 140.00, 'completed', '2024-02-12'),
('ORD-2024-006', 'Lisa Anderson', 'lisa@example.com', 75.00, 30.00, 'pending', '2024-02-20');

-- Create a default admin user (password should be hashed in real implementation)
INSERT INTO users (email, password_hash, full_name, role) VALUES
('admin@fabricfactory.com', '$2b$10$example_hash_here', 'Factory Administrator', 'admin');

-- Add order_position column to projects table
ALTER TABLE projects ADD COLUMN order_position INTEGER DEFAULT 0;

-- Set initial order based on creation date (oldest first)
UPDATE projects 
SET order_position = row_number() OVER (ORDER BY created_at)::INTEGER;

-- Add index for better performance when ordering
CREATE INDEX idx_projects_order_position ON projects(order_position);

import { supabase } from '@/integrations/supabase/client';

// Removed questions fetch; mock data now supplies questions locally

export const fetchCourses = async () => {
  const { data, error } = await supabase
    .from('courses') // Replace with your table name
    .select('*');

  if (error) {
    console.error('Error fetching courses:', error);
    return [];
  }

  return data;
};

export const fetchRoadmap = async () => {
  const { data, error } = await supabase
    .from('roadmap') // Replace with your table name
    .select('*');

  if (error) {
    console.error('Error fetching roadmap:', error);
    return [];
  }

  return data;
};
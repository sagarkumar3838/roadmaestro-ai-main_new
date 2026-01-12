import React from 'react';
import { useParams } from 'react-router-dom';
import { JavaModuleLearning } from '@/components/java/JavaModuleLearning';

export default function JavaModulePage() {
  const { moduleId } = useParams<{ moduleId: string }>();
  
  if (!moduleId) {
    return <div>Module not found</div>;
  }

  return <JavaModuleLearning moduleId={moduleId} />;
}
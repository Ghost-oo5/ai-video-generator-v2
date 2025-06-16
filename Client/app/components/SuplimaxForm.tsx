'use client';

import React from 'react';
import type { SuplimaxFormData, SuplimaxFormProps } from '@/app/types';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectGroup
} from '@/components/ui/select';

const OPTIONS = {
  tone: ['Energetic', 'Sophisticated', 'Humorous', 'Mysterious', 'Bold', 'Refreshing'],
  audience: [
    'Young Adults (18-25)',
    'Athletes & Fitness Enthusiasts',
    'Gamers',
    'Busy Professionals',
    'Students',
  ],
  videoStyle: [
    'Fast-paced & Dynamic',
    'Cinematic & Epic',
    'User Testimonial',
    'Animated Explainer',
    'Lifestyle Vignette',
  ],
};

export const SuplimaxForm = ({ formData, onFormChange, onSubmit, isLoading }: SuplimaxFormProps) => {
  const handleChange = (key: keyof SuplimaxFormData, value: string) => {
    onFormChange({ ...formData, [key]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Features */}
      <div className="space-y-2">
        <Label htmlFor="features">Key Product Features</Label>
        <Textarea
          id="features"
          placeholder="e.g., Natural ingredients, Zero sugar, Boosts focus"
          value={formData.features}
          onChange={(e) => handleChange('features', e.target.value)}
          disabled={isLoading}
          required
        />
      </div>

      {/* Selects */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Tone */}
        <div className="space-y-2">
          <label>Tone</label>
          <Select
            value={formData.tone}
            onValueChange={(val) => handleChange('tone', val)}
            disabled={isLoading}
          >
            <SelectTrigger className='w-full'>
              <SelectValue placeholder="Select tone" />
            </SelectTrigger>
            <SelectContent>
              {OPTIONS.tone.map((tone) => (
                <SelectItem key={tone} value={tone}>
                  {tone}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Target Audience</Label>
          <Select
            value={formData.audience}
            onValueChange={(val) => handleChange('audience', val)}
            disabled={isLoading}
          >
            <SelectTrigger className='w-full'>
              <SelectValue placeholder="Select audience" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
              {OPTIONS.audience.map((aud) => (
                <SelectItem key={aud} value={aud}>
                  {aud}
                </SelectItem>
              ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Video Style</Label>
          <Select
            value={formData.videoStyle}
            onValueChange={(val) => handleChange('videoStyle', val)}
            disabled={isLoading}
          >
            <SelectTrigger className='w-full'>
              <SelectValue placeholder="Select style" />
            </SelectTrigger>
            <SelectContent>
              {OPTIONS.videoStyle.map((style) => (
                <SelectItem key={style} value={style}>
                  {style}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button type="submit" color="blue" disabled={isLoading} className="w-full text-white bg-blue-600 hover:bg-blue-800">
        {isLoading ? 'Generating Suplimax Content...' : 'Generate Suplimax Video Script'}
      </Button>
    </form>
  );
};


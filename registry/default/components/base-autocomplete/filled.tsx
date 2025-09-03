'use client';

import * as React from 'react';
import {
  Autocomplete,
  AutocompleteInput,
  AutocompletePortal,
  AutocompletePositioner,
  AutocompletePopup,
  AutocompleteList,
  AutocompleteItem,
  AutocompleteEmpty,
} from '@/registry/default/ui/base-autocomplete';

interface Tag {
  id: string;
  value: string;
}

const tags: Tag[] = [
  { id: 't1', value: 'feature' },
  { id: 't2', value: 'fix' },
  { id: 't3', value: 'bug' },
  { id: 't4', value: 'docs' },
  { id: 't5', value: 'internal' },
  { id: 't6', value: 'mobile' },
  { id: 'c-accordion', value: 'component: accordion' },
  { id: 'c-alert-dialog', value: 'component: alert dialog' },
  { id: 'c-autocomplete', value: 'component: autocomplete' },
  { id: 'c-avatar', value: 'component: avatar' },
  { id: 'c-checkbox', value: 'component: checkbox' },
  { id: 'c-collapsible', value: 'component: collapsible' },
  { id: 'c-dialog', value: 'component: dialog' },
  { id: 'c-input', value: 'component: input' },
  { id: 'c-menu', value: 'component: menu' },
];

export default function Component() {
  return (
    <div className="w-64">
      <Autocomplete items={tags} variant="filled">
        <label className="block text-sm font-medium text-gray-900 mb-1">
          Search tags
        </label>
        <AutocompleteInput placeholder="e.g. feature" />

        <AutocompletePortal>
          <AutocompletePositioner sideOffset={4}>
            <AutocompletePopup>
              <AutocompleteEmpty>
                No tags found.
              </AutocompleteEmpty>
              <AutocompleteList>
                {(tag: Tag) => (
                  <AutocompleteItem key={tag.id} value={tag}>
                    {tag.value}
                  </AutocompleteItem>
                )}
              </AutocompleteList>
            </AutocompletePopup>
          </AutocompletePositioner>
        </AutocompletePortal>
      </Autocomplete>
    </div>
  );
}
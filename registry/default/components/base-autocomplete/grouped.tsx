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
  AutocompleteGroup,
  AutocompleteGroupLabel,
} from '@/registry/default/ui/base-autocomplete';

interface Tag {
  id: string;
  label: string;
  group: 'Type' | 'Component';
}

interface TagGroup {
  value: string;
  items: Tag[];
}

const tagsData: Tag[] = [
  { id: 't1', label: 'feature', group: 'Type' },
  { id: 't2', label: 'fix', group: 'Type' },
  { id: 't3', label: 'bug', group: 'Type' },
  { id: 't4', label: 'docs', group: 'Type' },
  { id: 't5', label: 'internal', group: 'Type' },
  { id: 't6', label: 'mobile', group: 'Type' },
  { id: 'c-accordion', label: 'component: accordion', group: 'Component' },
  { id: 'c-alert-dialog', label: 'component: alert dialog', group: 'Component' },
  { id: 'c-autocomplete', label: 'component: autocomplete', group: 'Component' },
  { id: 'c-avatar', label: 'component: avatar', group: 'Component' },
  { id: 'c-checkbox', label: 'component: checkbox', group: 'Component' },
  { id: 'c-collapsible', label: 'component: collapsible', group: 'Component' },
  { id: 'c-dialog', label: 'component: dialog', group: 'Component' },
  { id: 'c-input', label: 'component: input', group: 'Component' },
  { id: 'c-menu', label: 'component: menu', group: 'Component' },
];

function groupTags(tags: Tag[]): TagGroup[] {
  const groups: { [key: string]: Tag[] } = {};
  tags.forEach((t) => {
    (groups[t.group] ??= []).push(t);
  });
  const order = ['Type', 'Component'];
  return order.map((value) => ({ value, items: groups[value] ?? [] }));
}

const groupedTags: TagGroup[] = groupTags(tagsData);

export default function Component() {
  return (
    <div className="w-64">
      <Autocomplete items={groupedTags}>
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
                {(group: TagGroup) => (
                  <AutocompleteGroup key={group.value} items={group.items}>
                    <AutocompleteGroupLabel>
                      {group.value}
                    </AutocompleteGroupLabel>
                    {group.items.map((tag: Tag) => (
                      <AutocompleteItem key={tag.id} value={tag}>
                        {tag.label}
                      </AutocompleteItem>
                    ))}
                  </AutocompleteGroup>
                )}
              </AutocompleteList>
            </AutocompletePopup>
          </AutocompletePositioner>
        </AutocompletePortal>
      </Autocomplete>
    </div>
  );
}
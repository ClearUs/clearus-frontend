import type { UnitNode } from './types';
import type { OrgNode } from '@/types';

export function flattenUnitTree(tree: UnitNode[]): OrgNode[] {
  const result: OrgNode[] = [];

  const walk = (nodes: UnitNode[], parentId: string | null) => {
    for (const node of nodes) {
      result.push({
        id: node.id,
        name: node.name,
        type: mapUnitType(node.unit_type),
        staffCount: 0,
        allowedDomains: [],
        boundWorkflows: [],
        parentId,
      });
      if (node.children?.length) {
        walk(node.children, node.id);
      }
    }
  };

  walk(tree, null);
  return result;
}

function mapUnitType(apiType: string): OrgNode['type'] {
  const lower = apiType.toLowerCase();
  if (lower === 'academic') return 'faculty';
  if (lower === 'non-academic') return 'division';
  if (lower === 'department') return 'department';
  if (lower === 'desk') return 'desk';
  return 'department';
}

export function orgNodeToCreatePayload(node: Partial<OrgNode>) {
  return {
    name: node.name ?? '',
    code_name: (node.name ?? '').replace(/\s+/g, '_').toUpperCase().slice(0, 10),
    unit_type: reverseMapUnitType(node.type ?? 'department'),
    parent_id: node.parentId ?? null,
    permissions: [],
    identity_assets: {},
  };
}

function reverseMapUnitType(type: OrgNode['type']): string {
  if (type === 'faculty') return 'academic';
  if (type === 'division') return 'non-academic';
  return type;
}

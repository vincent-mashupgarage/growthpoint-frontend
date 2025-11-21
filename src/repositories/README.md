# Repository Pattern - Data Access Layer

This directory implements the Repository Pattern to abstract data access operations from the rest of the application.

## Why Repository Pattern?

The Repository Pattern provides several benefits:

1. **Separation of Concerns**: Business logic (in stores) is separated from data access logic (in repositories)
2. **Easy Testing**: Mock repositories can be injected for unit tests
3. **Flexibility**: Easy to switch between mock data, REST API, GraphQL, or local storage
4. **Consistency**: Uniform interface for all data operations
5. **Migration Path**: Smooth transition from mock data to real backend

## Current Structure

```
src/repositories/
├── interfaces/              # TypeScript interfaces (contracts)
│   ├── IEmployeeRepository.ts
│   ├── IInventoryRepository.ts
│   └── IPayrollRepository.ts
├── EmployeeRepository.ts    # Mock implementation (TODO)
├── InventoryRepository.ts   # Mock implementation (TODO)
├── PayrollRepository.ts     # Mock implementation (TODO)
└── README.md               # This file
```

## Migration Roadmap

### Phase 1: Preparation ✅ (CURRENT)
- [x] Create repository interfaces
- [x] Document architecture and migration plan
- [ ] Create mock repository implementations
- [ ] Add JSDoc documentation to repositories

### Phase 2: Integration (FUTURE)
- [ ] Update Zustand stores to use repository interfaces
- [ ] Inject repositories into stores (dependency injection)
- [ ] Test with mock repositories
- [ ] Ensure all CRUD operations work

### Phase 3: API Implementation (WHEN BACKEND IS READY)
- [ ] Create ApiEmployeeRepository implements IEmployeeRepository
- [ ] Create ApiInventoryRepository implements IInventoryRepository
- [ ] Create ApiPayrollRepository implements IPayrollRepository
- [ ] Add authentication headers
- [ ] Add error handling and retry logic
- [ ] Implement caching strategies

### Phase 4: Switch to Production
- [ ] Update repository factory to return API repositories
- [ ] Test all flows end-to-end
- [ ] Monitor and fix issues
- [ ] Remove mock repositories (or keep for development mode)

## How to Use Repositories (Future)

### Example: Employee Store with Repository

**Before** (Current - Direct mock data):
```typescript
// employeeStore.ts
export const useEmployeeStore = create<EmployeeState>((set, get) => ({
    employees: MOCK_EMPLOYEES,  // Hardcoded mock data
    getEmployeeById: (id) => {
        return get().employees.find(e => e.id === id);
    },
}));
```

**After** (With Repository Pattern):
```typescript
// employeeStore.ts
import { createEmployeeRepository } from '@/repositories/EmployeeRepository';

const employeeRepo = createEmployeeRepository();  // Factory returns mock or API repo

export const useEmployeeStore = create<EmployeeState>((set, get) => ({
    employees: [],
    isLoading: false,

    // Load employees from repository
    loadEmployees: async () => {
        set({ isLoading: true });
        const employees = await employeeRepo.getAll();
        set({ employees, isLoading: false });
    },

    getEmployeeById: async (id) => {
        return await employeeRepo.getById(id);
    },

    createEmployee: async (employee) => {
        const newEmployee = await employeeRepo.create(employee);
        set(state => ({
            employees: [...state.employees, newEmployee]
        }));
        return newEmployee;
    },
}));
```

### Example: Switching from Mock to API

```typescript
// repositories/factory.ts
import { IEmployeeRepository } from './interfaces/IEmployeeRepository';
import { MockEmployeeRepository } from './MockEmployeeRepository';
import { ApiEmployeeRepository } from './ApiEmployeeRepository';

export function createEmployeeRepository(): IEmployeeRepository {
    // Use environment variable to switch implementations
    if (process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true') {
        return new MockEmployeeRepository();
    }

    return new ApiEmployeeRepository({
        baseUrl: process.env.NEXT_PUBLIC_API_URL,
        apiKey: process.env.NEXT_PUBLIC_API_KEY
    });
}
```

## Benefits for Your Project

1. **No Code Changes Needed**: When you add a backend, you only modify the repository implementations, not the stores or components

2. **Development/Production Modes**: Run with mock data locally, real API in production

3. **Testing**: Easy to test stores by mocking repository responses

4. **Offline Mode**: Can add a LocalStorageRepository for offline functionality

5. **Type Safety**: TypeScript ensures all repositories implement the same interface

## Next Steps

To start using the repository pattern:

1. **Create mock implementations** of the repository interfaces
2. **Refactor one store** (e.g., employeeStore) to use the repository
3. **Test thoroughly** to ensure everything works
4. **Refactor remaining stores** one by one
5. **When backend is ready**, create API repository implementations
6. **Switch** the factory to return API repositories

## Questions?

If you have questions about this architecture, check:
- `interfaces/` for the repository contracts
- This README for migration guidance
- Individual repository files for implementation examples

---

**Note**: The current stores (employeeStore, inventoryStore, payrollStore) still use direct mock data.
This repository structure is prepared for future migration and serves as documentation of the intended architecture.

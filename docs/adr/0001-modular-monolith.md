# ADR 0001: Modular monolith first

Status: Accepted.

Decision: one deployable API with strict domain modules and separately deployable web/worker processes. The product is early; distributed services would add operational complexity before boundaries and traffic are understood. Enforce import boundaries, module ownership, application ports and domain events. Extract services only with measured evidence.

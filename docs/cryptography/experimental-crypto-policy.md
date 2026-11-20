# Experimental cryptography policy

Quantum may research and prototype original cryptographic constructions, but experimental algorithms are never enabled for production confidentiality, authentication, signatures, key exchange or route signing by default.

## Separation

- `standard/`: audited, interoperable protocols and vetted library adapters.
- `experimental/`: research prototypes, simulations and academic evaluation only.
- `test-vectors/`: deterministic public test vectors and adversarial cases.
- `reviews/`: design reviews, independent cryptanalysis and implementation audits.

## Promotion gates

An experimental primitive must have a written specification, threat model, public test vectors, constant-time implementation review where applicable, independent cryptanalysis, interoperability tests, side-channel analysis, fuzzing, key lifecycle design and a documented migration/rollback plan. It must not replace established algorithms solely because internal tests pass.

Use hybrid standard + post-quantum constructions only when the protocol and implementation define the composition safely. Avoid algorithm agility that lets an attacker downgrade negotiation.
